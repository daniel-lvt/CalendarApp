const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require("../helpers");

const crearUsuario = async (req = request, res = response) => {

    try {

        const { email, password, name } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya se encuentra registrado'
            })
        }

        const newUserObject = {
            name,
            email,
            password,
            rol: 'ADMIN_ROLE'
        }

        const newUser = new User(newUserObject);

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        const infoJWT = {
            user: newUser.id,
            name: newUser.name,
            rol: newUser.rol
        }

        const token = await generarJWT(infoJWT);

        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            rol: newUser.rol,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }
}

const loginUsuario = async (req = request, res = response) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'email o contraseña incorrectos'
            });
        }

        if (!user.state) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario se encuentra bloqueado, hable con el administrador'
            });
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {

            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta'
            });
        }

        const infoJWT = {
            id: user.id,
            name: user.name,
            rol: user.rol
        }

        const token = await generarJWT(infoJWT)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            rol: user.rol,
            token
        })
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

}

const updatedPassword = async (req, res = response) => {

    try {

        const { password } = req.body;

        const id = req.uid;

        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt)

        await User.findByIdAndUpdate(id, { password: newPassword });

        res.status(200).json({
            ok: true,
            msg: 'La contraseña ha sido actualizada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;
    const data = { uid, name };
    const token = await generarJWT(data);
    res.json({
        ok: true,
        uid,
        name,
        token
    })
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    updatedPassword
}