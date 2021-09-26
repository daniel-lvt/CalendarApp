const { Router } = require('express');
const { check } = require('express-validator');
const { usersLockeds, updateLockedUser } = require('../controllers/user');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');


const router = Router();

router.use(validarJWT);
router.use(validarRol)

router.get('/', usersLockeds);

router.post('/:id', [
    check('id', 'el id es necesario').not().isEmpty(),
    check('id', 'no es un id de mongo valido').isMongoId(),
    validarCampos
], updateLockedUser)


module.exports = router;