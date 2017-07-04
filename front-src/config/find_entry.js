const glob = require('glob')


module.exports.find = function(pattern){
    const entry = {};
    const files = glob.sync(pattern)

    files.forEach(file=>{
        const pathPartial = file.split('/')
        if(pathPartial.length===5){
            entry[pathPartial[3]] = file
        }
        if(pathPartial.length===6){
            if(pathPartial[4]==='index'){
                entry[pathPartial[3]] = file
            } else {
                entry[`${pathPartial[3]}_${pathPartial[4]}`] = file
            }
        }
    })
    return entry
}