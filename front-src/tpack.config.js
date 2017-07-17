const tPack = require('./config/resource_html')
const find = require('./config/find_entry').find

console.log(find('./src/pages/**/*.html', {
    // ignore: './src/pages/home/**'
}))

let options = {
    context: '.',
    entry: find('./src/pages/**/*.html', {
        ignore: './src/pages/home/'
    }),
    output: {
        path: 'dist',
        publicAssets: 'dist/statics/',
        script: 'dist/statics/script',
        link: 'dist/statics/css',
        img: 'dist/statics/images'
    },
    modify: {
        random: '__random',
        raw: '__raw'
    },
    defer: {
        all: true,
        ifSign: '__def',
        ifNotSign: '__nodef'
    },
    plain: true
}

a = tPack(options, ()=>{console.log('OK')})
