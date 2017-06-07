const redis = require('redis');
const config = {
    RDS_HOST: '127.0.0.1',
    RDS_PORT: '6379',
};
config.RDS_OPTS = {auth_pass: 'tjf9975'};

let client = redis.createClient(config.RDS_PORT, config.RDS_HOST, config.RDS_OPTS);

client.on('error', function (err) {
    console.log(err)
})

const cached = (function cached(){
    return new Promise(function (res, rej) {
        client.on('ready', function (err) {
            if(err){
                rej(err)
            }else{
                res(client)
            }
        })
    });
})()

module.exports = {
    set: (key, value, age)=>{
        return new Promise((res, rej)=>{
            cached.then(client=>{
                client.set(key, value, (err)=>{
                    if(!err){
                        res(true)
                        return
                    }
                    rej(err)
                })
            })
        })
    },
    get: key => {
        return new Promise((res, rej)=>{
            cached.then(client=>{
                client.get(key, (err, reply)=>{
                    if(!err){
                        res(reply)
                    } else{
                        rej(err)
                    }
                })
            })
        })
    }
}
