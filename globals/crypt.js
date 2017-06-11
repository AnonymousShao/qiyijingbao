const crypto = require('crypto')
const skey = '1qaz2wsx'

module.exports = {
    encrypt(plaintext){
        let ciph;
        const key = Buffer.from(skey),
            iv = Buffer.from(skey),
            cipher = crypto.createCipheriv('des-cbc', key, iv);
        cipher.setAutoPadding(true)
        ciph = cipher.update(plaintext, 'utf8', 'hex');
        ciph += cipher.final('hex');
        return ciph;
    },
    decrypt(encrypt_text,iv){
        var key = new Buffer(key);
        var iv = new Buffer(iv ? iv : 0);
        var decipher = crypto.createDecipheriv('des-cbc', key, iv);
        decipher.setAutoPadding(true);
        var txt = decipher.update(encrypt_text, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    },
    sha512(text){
        const hash = crypto.createHash('sha512')
        hash.update(text)
        return hash.digest('hex')
    }
};
