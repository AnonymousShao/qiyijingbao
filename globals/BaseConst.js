const getBaseConst = require('../apis').getBaseConst;
let Base = {}

getBaseConst().then(data=>{
    for(let key of data){
        Base[key] = data[key]
    }
})

module.exports = Base
