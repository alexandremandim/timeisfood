const express = require('express');
const router = express.Router()
const avisosController = require("../controllers/avisos")
const checkAuth = require('../middleware/check_auth')

router.get('/', avisosController.get_all_avisos);
router.post('/', avisosController.insert_aviso);
router.get('/:idAviso', avisosController.get_aviso);
router.patch('/:idAviso', avisosController.edit_aviso);

/* Rotas com permissões */
/*

*/

module.exports = router;