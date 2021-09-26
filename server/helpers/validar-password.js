const { response } = require('express');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols(2)
    .has().not().spaces();

const validatePassword = (password) => {

    if (schema.validate(password)) {
        return true;
    } else {
        throw new Error(`La contraseña no cumple con los parametros minimos`)
    }
}

module.exports = {
    validatePassword
}