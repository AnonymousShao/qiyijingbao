const fs = require('fs'),
    path = require('path');

const current = path.resolve(__dirname, '../') + '/'

const js = [
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/redux/dist/redux.js',
    'node_modules/react-redux/dist/react-redux.js',
    'node_modules/react-router-dom/umd/react-router-dom.js',
]

const jsProd = [
    'node_modules/react/dist/react.min.js',
    'node_modules/react-dom/dist/react-dom.min.js',
    'node_modules/redux/dist/redux.min.js',
    'node_modules/react-redux/dist/react-redux.min.js',
    'node_modules/react-router-dom/umd/react-router-dom.min.js',
]

const css = [
    'node_modules/weui/dist/style/weui.css',
    'node_modules/react-weui/lib/react-weui.min.css'
]

const cssProd = [
    'node_modules/weui/dist/style/weui.min.css',
    'node_modules/react-weui/lib/react-weui.min.css'
]

const htmls = {
    home: 'src/pages/home/index.html',
    login: 'src/pages/login/index.html',
    demo: 'src/pages/demo/index.html'
}

js.forEach(item=>{
    const fileName = item.split('/'),
        name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/script/'+name))
})

jsProd.forEach(item=>{
    const fileName = item.split('/'),
        name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/script/'+name))
})

css.forEach(item=>{
    const fileName = item.split('/'),
        name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/css/'+name))
})

cssProd.forEach(item=>{
    const fileName = item.split('/'),
        name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/css/'+name))
})

Object.keys(htmls).forEach(name=>{
    fs.createReadStream(current + htmls[name]).pipe(fs.createWriteStream(current+'dist/' + name + '.html'))
})
