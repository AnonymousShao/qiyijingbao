const success = '0'
module.exports = {
    error: function (res_error) {
        return {
            res_code: '333',
            res_error,
        }
    },
    success: function (res_body) {
        return {
            res_code: success,
            res_body
        }
    },
    successCode: success
}