const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();


router.get('/', validarJWT, getEventos);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de inicio es obligatoria').custom(isDate),
        validarCampos,
        validarJWT
    ],
    crearEvento);

router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de inicio es obligatoria').custom(isDate),
        validarCampos,
        validarJWT
    ],
    actualizarEvento);

router.delete('/:id', validarJWT, eliminarEvento);

module.exports = router;


