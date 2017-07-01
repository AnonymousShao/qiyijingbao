const fs = require('fs'),
    cheerio = require('cheerio'),
    path = require('path');

const current = path.resolve(__dirname, '../') + '/'
const jsOutDist = 'dist/statics/script/',
    htmlOutDist = 'dist/',
    cssOutDist = 'dist/statics/css/';

let htmlFiles = {
    home: 'src/pages/home/index.html',
    demo: 'src/pages/demo/index.html',
    login: 'src/pages/login/index.html',
    search: 'src/pages/search/index.html',
    artist_list: 'src/pages/artist_list/index.html',
    artist_detail: 'src/pages/artist_detail/index.html',
    auction: 'src/pages/auction/index.html',
    auction_schedule: 'src/pages/auction_schedule/index.html',
    auction_list: 'src/pages/auction_list/index.html',
    auction_bid: 'src/pages/auction_bid/index.html',
    bid_refer: 'src/pages/bid_refer/index.html',
    auction_detail: 'src/pages/auction_detail/index.html',
    auction_history_list: 'src/pages/auction_history_list/index.html',
    auction_history_detail: 'src/pages/auction_history_detail/index.html',
};

const scriptObjs = [],
    linkObjs = [];

function getEntities(){
    Object.keys(htmlFiles).forEach(html=>{
        const relativeDir = path.dirname(path.resolve(current, htmlFiles[html]))
        const rawHtml = fs.readFileSync(current + htmlFiles[html])
        let $ = cheerio.load(rawHtml);
        htmlFiles[html] = $
        const CheerioScripts = $('script'),
            CheerioLinks = $('link');
        for(let i=0;i<CheerioScripts.length;i++){
            CheerioScripts[i].attribs['defer'] = undefined
            if(CheerioScripts[i].attribs['__raw']===undefined && CheerioScripts[i].attribs.src){
                scriptObjs.push({
                    dom: CheerioScripts[i],
                    relativeDir,
                    sourceDir: CheerioScripts[i].attribs.src,
                    distDir: ''
                })
            } else {
                delete CheerioScripts[i].attribs['__raw']
            }
        }
        for(let i=0;i<CheerioLinks.length;i++){
            if(CheerioLinks[i].attribs['__raw']===undefined){
                linkObjs.push({
                    dom: CheerioLinks[i],
                    relativeDir,
                    sourceDir: CheerioLinks[i].attribs.href,
                    distDir: ''
                })
            } else {
                delete CheerioLinks[i].attribs['__raw']
            }
        }
    })
}

function selectEntityObjs(){
    scriptObjs.forEach(script=>{
        script.sourceDir = path.resolve(script.relativeDir, script.sourceDir)
    })

    linkObjs.forEach(link=>{
        link.sourceDir = path.resolve(link.relativeDir, link.sourceDir)
    })
}

function transfer(){
    function copy(src, distDir){
        const fileName = src.sourceDir.split('/'),
            name = fileName[fileName.length-1]
        try{
            fs.createReadStream(src.sourceDir).pipe(
                fs.createWriteStream(current + distDir + name)
            )
            src.distDir = (distDir + name).replace('dist/', '')
        } catch (e){
            console.log(e)
        }
    }

    scriptObjs.forEach(item=>{
        copy(item, jsOutDist)
    })
    linkObjs.forEach(item=>{
        copy(item, cssOutDist)
    })
}

function linkToDest() {
    scriptObjs.forEach(script=>{
        script.dom.attribs.src = script.distDir
    })
    linkObjs.forEach(link=>{
        link.dom.attribs.href = link.distDir
    })
}

function product(){
    Object.keys(htmlFiles).forEach(htmlName=>{
        htmlFiles[htmlName] = htmlFiles[htmlName].html()
            .replace(/<!--.+?-->\n/g, '')
            .replace(/\n/g, '')
            .replace(/\s+/, ' ')
            .replace(/>(\s)+</g, '><')
    })
}

function compileToDist(){
    Object.keys(htmlFiles).forEach(htmlName=>{
        fs.writeFileSync(current + htmlOutDist + htmlName + '.html', htmlFiles[htmlName])
    })
}

getEntities()
selectEntityObjs()
transfer()
linkToDest()
product()
compileToDist()
