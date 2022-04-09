const express = require('express');
const router = express.Router()
const senhasConsumidores = require("../controllers/senhasconsumidores")
const checkAuth = require('../middleware/check_auth')

router.get('/', senhasConsumidores.get_all_senhasconsumidores);
router.post('/', senhasConsumidores.insert_senhaconsumidor);
router.get('/:idSenhaConsumidor', senhasConsumidores.get_senhaconsumidor);
router.patch('/:idSenhaConsumidor', senhasConsumidores.edit_senhaconsumidor);
router.get('/consumidor/:idConsumidor', senhasConsumidores.get_senhasPorConsumidor);
router.get('/usadas/consumidor/:idConsumidor', senhasConsumidores.get_senhasUsadasPorConsumidor);
router.get('/naousadas/consumidor/:idConsumidor', senhasConsumidores.get_senhasNaoUsadasPorConsumidor);
router.get('/naoreservadas/consumidor/:idConsumidor', senhasConsumidores.get_senhasNaoReservadasPorConsumidor);
router.get('/reservadas/consumidor/:idConsumidor', senhasConsumidores.get_senhasReservadasPorConsumidor);

/* Rotas com permissões */
/*

*/

module.exports = router;