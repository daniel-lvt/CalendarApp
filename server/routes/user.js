const { Router } = require('express');
const { check } = require('express-validator');
const { usersLockeds } = require('../controllers/user');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');


const router = Router();

router.use(validarJWT);
router.use(validarRol)

router.get('/', usersLockeds);


module.exports = router;