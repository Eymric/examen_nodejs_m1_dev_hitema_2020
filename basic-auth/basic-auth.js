const crypto = require('crypto');


function sha1Encode(data) {
    const hash = crypto.createHash('sha1');
    hash.update('password');
    const crypted = hash.digest('hex');
    if(crypted === data)
        return 'password';
}

module.exports.digestAuth = (request, response, next) => {

    const authorization = request.headers.authorization;  // 'Basic xxxx'
    const encoded = authorization.replace('Basic ', '');
    // https://nodejs.org/docs/latest-v12.x/api/buffer.html
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    // 'user:paswword'
    const authentication = decoded.split(':');
    var password = sha1Encode(authentication[1]);
    // si user = node & password=password, ok
    const isValid = authentication[0] === 'node'
        && password === 'password';

    // si pas authentifié
    isValid ? next() : response.sendStatus(401);

}
