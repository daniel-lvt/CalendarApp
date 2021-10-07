const jwt = require('jsonwebtoken');

const generarJWT = (information, expiresIn = '15000') => {
    return new Promise((resolve, reject) => {
        const payload = information;
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })

    });
}

module.exports = {
    generarJWT
}