const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');
const { changeTimeSesion, getDataLogs } = require('../controllers/config');


const router = Router();

router.use(validarJWT);
router.use(validarRol)

router.get('/', getDataLogs);

router.post('/', [
    check('expireIn').not().isEmpty(),
    validarCampos
], changeTimeSesion);




module.exports = router;