const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    email: {
        type: String,
        requered: [true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        requered: [true, 'la contraseña es obligatorio']
    },
    rol: {
        type: String,
        requered: [true, 'el rol es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    dateLocked: {
        type: Date
    },
    ipLocked: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});


UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();

    return {
        ...usuario,
        uid: _id
    };
}


module.exports = model('User', UserSchema);