const express = require('express');
const router = express.Router()
const acompanhamentoRefeicaoController = require("../controllers/acompanhamentorefeicao")
const checkAuth = require('../middleware/check_auth')

router.get('/', acompanhamentoRefeicaoController.get_all_acompanhamentosrefeicoes);
router.post('/', acompanhamentoRefeicaoController.insert_acompanhamentorefeicao);
//por refeicao
router.get('/:idRefeicao', acompanhamentoRefeicaoController.get_acompanhamentorefeicaoPorRefeicao);

/* Rotas com permissões */
/*
router.get('/', checkAuth.auth_todos, acompanhamentoRefeicaoController.get_all_acompanhamentosrefeicoes);
router.post('/', checkAuth.auth_todos, acompanhamentoRefeicaoController.insert_acompanhamentorefeicao);
//por refeicao
router.get('/:idRefeicao', checkAuth.auth_todos, acompanhamentoRefeicaoController.get_acompanhamentorefeicaoPorRefeicao);

*/




module.exports = router;