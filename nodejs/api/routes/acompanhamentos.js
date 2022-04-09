const express = require('express');
const router = express.Router()
const acompanhamentosController = require("../controllers/acompanhamentos")
const checkAuth = require('../middleware/check_auth')

router.get('/', acompanhamentosController.get_all_acompanhamentos);
router.post('/', acompanhamentosController.insert_acompanhamento);
router.get('/:idAcompanhamento', acompanhamentosController.get_acompanhamento);
router.patch('/:idAcompanhamento', acompanhamentosController.edit_acompanhamento);

/* Rotas com permissões */
/*
router.get('/', checkAuth.auth_todos, acompanhamentosController.get_all_acompanhamentos);
router.post('/', checkAuth.auth_administrador, acompanhamentosController.insert_acompanhamento);
router.get('/:idAcompanhamento', checkAuth.auth_todos, acompanhamentosController.get_acompanhamento);
router.patch('/:idAcompanhamento', checkAuth.auth_administrador, acompanhamentosController.edit_acompanhamento);

*/


module.exports = router;