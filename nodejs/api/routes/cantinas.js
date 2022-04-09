const express = require('express');
const router = express.Router()
const cantinasController = require("../controllers/cantinas")
const checkAuth = require('../middleware/check_auth')

router.get('/', cantinasController.get_all_cantinas);
router.get('/:idCantina', cantinasController.get_cantina);
router.patch('/:idCantina', cantinasController.edit_cantina)

/* Rotas com permissões */
/*
router.get('/', checkAuth.auth_todos, cantinasController.get_all_cantinas);
router.get('/:idCantina', checkAuth.auth_todos, cantinasController.get_cantina);
router.patch('/:idCantina', checkAuth.auth_administrador, cantinasController.edit_cantina)
*/

module.exports = router;