const des = require('../globals/crypt')

const signKeyCollection = {
    reset: 'Pre_MemberInfoView:Account,Password;ApiValid:token,timestamp',
    register: 'Pre_MemberInfoView:Account,Password,Mobile,securitycode;ApiValid:timestamp'
}

function getSignConfig(signKey) {
    let signConfig = signKeyCollection[signKey]
    let arraySign = signConfig.split(';')
    const list = []
    arraySign.forEach(string=>{
        const entityDetail = string.split(':'),
        signField = {
            sign_object_name: entityDetail[0],
            sign_object_field: entityDetail[1].split(',')
        }
        list.push(signField);
    })
    return list
}

function generateSign(listSignField, signObj){
    const dic1 = {}
    let sign = ''
    listSignField.forEach(vField=>{
        let fieldName = vField.sign_object_name,
        fieldKeys = vField.sign_object_field;
        fieldKeys.forEach(key=>{
            if(signObj[fieldName][key]){
                dic1[key] = signObj[fieldName][key]
            }
        })
    })
    const orderKeys = Object.keys(dic1).sort((prev, next)=>(prev>next))
    orderKeys.forEach(key=>{
        sign += `${key.toLowerCase()}=${dic1[key]}`
    })
    return sign
}

function shortenSign(str){
    return str.substr(0, 5) + str.substring(str.length-5)
}

function getInputObjectSignForH5(account, apiValid, signObj, signKey) {
    const listSignField = getSignConfig(signKey),
        signFeedback = {
            prepare_sign_string:'',//签名前的字段排序
            full_sign:'',          //加密后签名字串
            short_sign: '',
        }
    signFeedback.prepare_sign_string = generateSign(listSignField, signObj)
    signFeedback.full_sign = des.encrypt(signFeedback.prepare_sign_string).toUpperCase()
    signFeedback.short_sign = shortenSign(signFeedback.full_sign)
    return signFeedback;
}

module.exports.getInputObjectSignForH5 = getInputObjectSignForH5