const jwt = require('jsonwebtoken');

const generarJWT = (information) => {
    return new Promise((resolve, reject) => {
        const payload = information;
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1hr'
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