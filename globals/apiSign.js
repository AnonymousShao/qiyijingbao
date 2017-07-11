const des = require('../globals/crypt')

const signKeyCollection = {
    reset: 'Pre_MemberInfoView:Account,Password;ApiValid:token,timestamp',
    register: 'Pre_MemberInfoView:Account,Password,Mobile,securitycode;ApiValid:timestamp',
    bid: 'Pre_MemberInfoAuctionLogView:Account,AuctionNO,AuctionWorkNO;ApiValid:token,timestamp',
    comment: 'Pre_Comments:Account,CommentType;ApiValid:token,timestamp'
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

function generateSign(listSignField, signObj, session_secret){
    const dic1 = {}
    let sign = ''
    session_secret = session_secret || ''
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
    return sign + session_secret
}

function shortenSign(str){
    return str.substr(0, 5) + str.substring(str.length-5)
}

/*
*  signObj: {ApiValid, ApiSource, Pre_MemberInfoView: user}
* */

function getInputObjectSignForH5(account, apiValid, signObj, signKey, sessionSecret) {
    const listSignField = getSignConfig(signKey),
        signFeedback = {
            prepare_sign_string:'',//签名前的字段排序
            full_sign:'',          //加密后签名字串
            short_sign: '',
        }
    signFeedback.prepare_sign_string = generateSign(listSignField, signObj, sessionSecret)
    signFeedback.full_sign = des.encrypt(signFeedback.prepare_sign_string).toUpperCase()
    signFeedback.short_sign = shortenSign(signFeedback.full_sign)
    return signFeedback;
}

module.exports.getInputObjectSignForH5 = getInputObjectSignForH5
