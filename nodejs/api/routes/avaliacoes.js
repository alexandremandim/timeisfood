const express = require('express');
const router = express.Router()
const avaliacoesController = require("../controllers/avaliacoes")
const checkAuth = require('../middleware/check_auth')


router.get('/', avaliacoesController.get_all_avaliacoes);
router.post('/', avaliacoesController.insert_avaliacao);
router.get('/:idAvaliacao', avaliacoesController.get_avaliacao);
router.patch('/:idAvaliacao', avaliacoesController.edit_avaliacao);

router.get('/consumidor/:idConsumidor', avaliacoesController.get_avaliacoes_consumidor);


/* Rotas com permissões */
/*

*/

module.exports = router;