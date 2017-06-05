const fs = require('fs'),
    path = require('path');

const current = path.resolve(__dirname, '../') + '/'

const js = [
    'node_modules/react/dist/react.min.js',
    'node_modules/react-dom/dist/react-dom.min.js',
    'node_modules/redux/dist/redux.min.js',
    'node_modules/react-redux/dist/react-redux.min.js',
    'node_modules/react-router-dom/umd/react-router-dom.min.js',
    'node_modules/antd/dist/antd.min.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/draft-js/dist/Draft.min.js',
    'node_modules/immutable/dist/immutable.min.js'
]

const jsRaw = [
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/redux/dist/redux.js',
    'node_modules/react-redux/dist/react-redux.js',
    'node_modules/react-router-dom/umd/react-router-dom.js',
    'node_modules/antd/dist/antd.js',
    'node_modules/draft-js/dist/Draft.js',
    'node_modules/immutable/dist/immutable.js'
]

const css = [
    'node_modules/antd/dist/antd.min.css',
    'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
];

(js.concat(jsRaw)).forEach(item=>{
    const fileName = item.split('/'),
    name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/script/'+name))
})

css.forEach(item=>{
    const fileName = item.split('/'),
        name = fileName[fileName.length-1]
    fs.createReadStream(current + item).pipe(fs.createWriteStream(current+'dist/statics/css/'+name))
})
