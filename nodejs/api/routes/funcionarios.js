const express = require('express');
const router = express.Router()
const funcionariosController = require("../controllers/funcionarios")
const checkAuth = require('../middleware/check_auth')

router.get('/', funcionariosController.get_all_funcionarios);
router.post('/', funcionariosController.insert_funcionario);
router.get('/:idFuncionario', funcionariosController.get_funcionario);
router.patch('/:idFuncionario', funcionariosController.edit_funcionario);
router.post('/login', funcionariosController.login)
router.patch('/editPassword/:idFuncionario', funcionariosController.edit_funcionarios_password);

/* Rotas com permissões */
/*

*/

module.exports = router;