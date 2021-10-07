const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { id, name, rol, user } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = id || user;
        req.name = name;
        req.rol = rol;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}


module.exports = {
    validarJWT
}