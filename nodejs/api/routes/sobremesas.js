const express = require('express');
const router = express.Router()
const sobremesasController = require("../controllers/sobremesas")
const checkAuth = require('../middleware/check_auth')

router.get('/', sobremesasController.get_all_sobremesas);
router.post('/', sobremesasController.insert_sobremesa);
router.get('/:idSobremesa', sobremesasController.get_sobremesa);
router.patch('/:idSobremesa', sobremesasController.edit_sobremesa);

/* Rotas com permissões */
/*

*/

module.exports = router;