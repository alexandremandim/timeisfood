const express = require('express');
const router = express.Router()
const SopasController = require("../controllers/sopas")
const checkAuth = require('../middleware/check_auth')

router.get('/', SopasController.get_all_sopas);
router.post('/', SopasController.insert_sopa);
router.get('/:idSopa', SopasController.get_sopa);
router.patch('/:idSopa', SopasController.edit_sopa);

/* Rotas com permissões */
/*

*/

module.exports = router;