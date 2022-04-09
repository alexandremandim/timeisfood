const express = require('express');
const router = express.Router()
const RefeicoesController = require("../controllers/refeicoes")
const checkAuth = require('../middleware/check_auth')

router.get('/', RefeicoesController.get_all_refeicoes);
router.post('/', RefeicoesController.insert_refeicao);
router.get('/data', RefeicoesController.get_refeicaoBetweenDatas);
router.get('/data/:dataInicio&:dataFim', RefeicoesController.get_refeicaoBetweenDatasParams);
router.get('/:idRefeicao', RefeicoesController.get_refeicao);
router.patch('/:idRefeicao', RefeicoesController.edit_refeicao);

/* Rotas com permissões */
/*

*/

module.exports = router;