const express = require('express');
const router = express.Router()
const ConsumidorController = require("../controllers/consumidores")
const checkAuth = require('../middleware/check_auth')

router.get('/qrcode/:qrcode&:dataRefeicao', ConsumidorController.getSenhasReservadasByQrCode)
router.get('/naoaceites', ConsumidorController.get_consumidoresNaoAceites)
router.get('/', ConsumidorController.get_all_consumidores)
router.post('/login', ConsumidorController.login)
router.post('/', ConsumidorController.insert_consumidor)
router.get('/:idConsumidor', ConsumidorController.get_consumidor)
router.patch('/:idConsumidor', ConsumidorController.edit_consumidor)
router.patch('/editPassword/:idConsumidor', ConsumidorController.edit_consumidores_password)


/* Rotas com permissões */
/*

*/


module.exports = router;