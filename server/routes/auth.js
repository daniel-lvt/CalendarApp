const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');

const { validatePassword } = require('../helpers');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    loginUsuario,
    crearUsuario,
    revalidarToken,
    updatedPassword
} = require('../controllers/auth');
const { validarRol } = require('../middlewares/validar-rol');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'La Contraseña es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password').custom(value => validatePassword(value)),
        validarCampos,
    ],
    crearUsuario);


router.use(validarJWT);

router.get('/renew', revalidarToken);

router.use(validarRol)

router.put(
    '/',
    [
        check('password', 'La contraseña esobligatoria').not().isEmpty(),
        check('password').custom(value => validatePassword(value)),
        validarCampos
    ],
    updatedPassword
)

module.exports = router;
