const { response } = require('express');


const validarRol = (req, res = response, next) => {
    const rol = req.header('rol');

    if (!['ADMIN_ROLE'].includes(rol)) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene permisos para realizar esta accion'
        });
    }
    next()
}

module.exports = {
    validarRol
}