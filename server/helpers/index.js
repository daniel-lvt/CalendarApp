const { generarJWT } = require('./generar-jtw');
const { validatePassword } = require('./validar-password');
const { isDate } = require('./isDate');

module.exports = {
    generarJWT,
    validatePassword,
    isDate
}