const http = require('axios')
const host = require('./config').host
const moment = require('moment')
const getInputObjectSignForH5 = require('../globals/apiSign').getInputObjectSignForH5

function comment(params, signKey) {
    const commentView = {
        Account: params.Account,
        CommentUserType: '1',
        CommentInfo: params.CommentInfo,
        ReferenceNO: params.ReferenceNO,  // "唯一编号-竞拍品编号或者议价品编号"
        WorkNo: params.WorkNo,
        CommentType: '1'
    }

    const ApiValid = {
            sign: '',
            timestamp: moment().format('YYYYMMDDHHmmss'),
            token: params.token
        },
        ApiSource = {
            source: 4   // h5
        };
    const data = {
        ApiValid,
        ApiSource,
        Pre_Comments: commentView
    }
    const sessionSecret = params.sessionSecret

    let signField = getInputObjectSignForH5(commentView.Account, ApiValid, data, signKey, sessionSecret)
    ApiValid.sign = signField.short_sign
    return data
}

module.exports.postComment = function (params) {
    const data = comment(params, 'comment')
    return http.post(host + '/api/comments?flag=1', data).then(data=>data.data)
}

module.exports.getComments = function (params) {
    return http.get(host + '/api/comments', {params}).then(data=>data.data)
}
