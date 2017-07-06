const fs = require('fs'),
    cheerio = require('cheerio'),
    path = require('path');

const mixin = require('./tookit').mixin
const copyFile = require('./tookit').copyFile
const writeFile = require('./tookit').writeFile

const tooKit = {
    isOutLink: function isOutLink(src) {
        if(src[0] ==='/' && src[1] === '/'){
            return true
        }
        if(src.indexOf('://') > -1){
            return true
        }
    },
    extendResource: function() {
        if(arguments.length === 0) throw new Error("can't be empty!")
        const source = arguments[0],
            args = Array.prototype.splice.call(arguments, 1)
        for(let i = 0;i<args.length;i++){
            Object.keys(args[i]).forEach(distKey=>{
                source[distKey] = args[i][distKey]
            })
        }
    },
}

function Compiler(){
    this.allResource = {}
    this.raw = {

    }
}

Compiler.prototype.findFile = function (address, context) {
    let processDir = path.resolve(process.cwd(), this.options.context),
        runningEnv = process.cwd()

    if(address[0] === '/'){
        if(fs.existsSync(address)){
            return address
        }
        if(fs.existsSync(processDir + address)){
            return processDir + address
        }
        if(fs.existsSync(runningEnv + address)){
            return runningEnv + address
        }
    }

    let dist = path.resolve(context, address)
    if(fs.existsSync(dist)){
        return dist
    }
    throw new Error("can't find file " + address)
}

Compiler.prototype.execOutFile = function (address) {

}

Compiler.prototype.run = function (callback) {
    let scritps = [], links = [], images = [], imports = []

    function assembly(sourceObj) {
        if(!this.allResource[sourceObj.source]){
            this.allResource[sourceObj.source] = {
                name: sourceObj.name,
                doms: [sourceObj.dom],
                dist: this.options.output[sourceObj.dom.name],
                type: sourceObj.type,
            }
        } else {
            this.allResource[sourceObj.source].doms.push(sourceObj.dom)
        }
    }
    assembly = assembly.bind(this)

    // extract from imports
    if(Array.isArray(this._resource)){
        this._resource.forEach(res=>{
            imports = imports.concat(res.resources.imports)
        })
    } else {
        imports = this._resource.resources.imports
    }

    imports.forEach(assembly, this)
    imports.forEach(inline=>{
        const rawHtmlInfo = this.import(inline)
        mixin(inline, rawHtmlInfo)
        inline.newDom = rawHtmlInfo.dom
    })

    // extract other resources
    let arr
    if(Array.isArray(this._resource)){
        arr = this._resource.slice().concat(imports)
    } else {
        arr = [this._resource].concat(imports)
    }
    arr.forEach(res=>{
        scritps = scritps.concat(res.resources.scripts)
        links = links.concat(res.resources.links)
        images = images.concat(res.resources.images)
    })

    // deal resource
    scritps.forEach(assembly, this)
    links.forEach(assembly, this)
    images.forEach(assembly, this)

    // inline resource
    imports.forEach(inline=>{
        this.seal(inline)
        this.allResource[inline.source].body = inline.newDom
    })

    const rawInfo = this._resource
    if(Array.isArray(rawInfo)){
        rawInfo.forEach(raw=>{
            let outHtmlDom = this.seal(raw)
            writeFile(raw.outPath + '/' + raw.name + '.html', outHtmlDom.html())
        })
    } else {
        let outHtmlDom = this.seal(rawInfo)
        writeFile(rawInfo.outPath + '/' + rawInfo.name + '.html', outHtmlDom.html())
    }

    this.copy()
    if(callback){
        callback()
    }
}

Compiler.prototype.copy = function () {
    Object.keys(this.allResource).forEach(resourceName => {
        const info = this.allResource[resourceName]
        if(info.type !== 'copy') return
        copyFile(resourceName, path.resolve(info.dist, info.name))
    })
}

Compiler.prototype.import = function (imports) {
    return this.recursion(imports.source, imports.source)
}

Compiler.prototype.recursion = function(name, fileName){
    return this.entry(name, fileName)
}

/*
* @param {object} name
* input html raw object, link with the
* */

Compiler.prototype.seal = function(rawHtml){
    const sealFileName = function (res) {
        let srcAttr = 'src'
        if(res.dom.name === 'link'){
            srcAttr = 'href'
        }

        let relative = path.relative(rawHtml.outPath, this.allResource[res.source].dist)
        if(res.type==='import'){
            const index = res.dom.parent.children.indexOf(res.dom)
            res.dom.parent.children[index] = this.allResource[res.source].body('body')[0]
        } else {
            res.dom.attribs[srcAttr] = relative + '/' + res.name
        }
    }.bind(this)

    rawHtml.resources.scripts.forEach(sealFileName)
    rawHtml.resources.links.forEach(sealFileName)
    rawHtml.resources.images.forEach(sealFileName)
    rawHtml.resources.imports.forEach(sealFileName)
    return rawHtml.dom
}

Compiler.prototype.entry = function(name, htmlFile){
    const rawHtml = fs.readFileSync(path.resolve(this.context, htmlFile)),
        context = path.dirname(path.resolve(this.context, htmlFile))
    let $ = cheerio.load(rawHtml);

    const scripts = this.extractScript($, context)
    const links = this.extractCssLink($, context)
    const images = this.extractImage($, context)
    const imports = this.extractImport($, context)

    const _resource = {
        dom: $,
        name,
        resources: {
            scripts, links, images, imports
        },
        outPath: path.resolve(this.context, this.options.output.path),
        context: context
    }

    if(!this._resource){
        this._resource = _resource
    }
    return _resource
}

Compiler.prototype.multiEntry = function(entryArr) {
    const info = []

    entryArr.forEach(entry=>{
        info.push(entry)
    })
    this._resource = info
}

Compiler.prototype.extractScript = function($, context) {
    const CheerioScripts = $('script')
    const scriptObj = []

    for(let i=0;i<CheerioScripts.length;i++){
        const { raw } = this.options.modify
        if(raw in CheerioScripts[i].attribs && CheerioScripts[i].attribs[raw]!=='false'){
            delete CheerioScripts[i].attribs[raw]
            continue
        }
        if(!CheerioScripts[i].attribs.src || tooKit.isOutLink(CheerioScripts[i].attribs.src)){
            continue
        }
        if(CheerioScripts[i].attribs.type ){
            const type = CheerioScripts[i].attribs.type.toLowerCase()
            if(type!=='text/javascript'
                && type!=='text/ecmascript'
                && type!=='application/javascript'
                && type!=='application/ecmascript'){
                continue
            }
        }

        let [address, query] = CheerioScripts[i].attribs.src.split('?'),
            dir = path.dirname(address),
            name = path.basename(address)

        const scriptRaw = {
            dom: CheerioScripts[i],
            dir, name, query,
            source: this.findFile(address, context),
            dist: this.options.plain?'':address,
            type: 'copy'
        }
        scriptObj.push(scriptRaw)
    }
    return scriptObj
}

Compiler.prototype.extractCssLink = function($, context) {
    const CheerioLinks = $('link[rel=stylesheet]')
    const linkObj = []

    for(let i=0;i<CheerioLinks.length;i++){
        const { raw } = this.options.modify
        if(raw in CheerioLinks[i].attribs && CheerioLinks[i].attribs[raw]!=='false'){
            delete CheerioLinks[i].attribs[raw]
            continue
        }
        if(!CheerioLinks[i].attribs.href || tooKit.isOutLink(CheerioLinks[i].attribs.href)){
            continue
        }
        if(CheerioLinks[i].attribs.type && CheerioLinks[i].attribs.type!=='text/css' ) continue

        let [address, query] = CheerioLinks[i].attribs.href.split('?'),
            dir = path.dirname(address),
            name = path.basename(address)

        const linkRaw = {
            dom: CheerioLinks[i],
            dir, name, query,
            source: this.findFile(address, context),
            dist: this.options.plain?'':address,
            type: 'copy'
        }
        linkObj.push(linkRaw)
    }
    return linkObj
}

Compiler.prototype.extractImport = function ($, context) {
    const CheerioLinks = $('link[rel=import]')
    const linkObj = []

    for(let i=0;i<CheerioLinks.length;i++){
        const { raw } = this.options.modify
        if(raw in CheerioLinks[i].attribs && CheerioLinks[i].attribs[raw]!=='false'){
            delete CheerioLinks[i].attribs[raw]
            continue
        }
        if(!CheerioLinks[i].attribs.href || tooKit.isOutLink(CheerioLinks[i].attribs.href)){
            continue
        }

        let [address, query] = CheerioLinks[i].attribs.href.split('?'),
            dir = path.dirname(address),
            name = path.basename(address)

        const linkRaw = {
            dom: CheerioLinks[i],
            dir, name, query,
            source: this.findFile(address, context),
            dist: this.options.plain?'':address,
            type: 'import',
        }
        linkObj.push(linkRaw)
    }
    return linkObj
}

Compiler.prototype.extractImage = function($, context) {
    const CheerioImages = $('img')
    const imageObj = []

    for(let i=0;i<CheerioImages.length;i++){
        if(!CheerioImages[i].attribs.src || tooKit.isOutLink(CheerioImages[i].attribs.src)){
            continue
        }

        let [address, query] = CheerioImages[i].attribs.src.split('?'),
            dir = path.dirname(address),
            name = path.basename(address)

        const imageRaw = {
            dom: CheerioImages[i],
            dir, name, query,
            source: this.findFile(address, context),
            dist: this.options.plain?'':address,
            type: 'copy'
        }
        imageObj.push(imageRaw)
    }
    return imageObj
}

module.exports = Compiler