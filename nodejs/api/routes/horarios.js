const express = require('express');
const router = express.Router()
const horarioController = require("../controllers/horarios")
const checkAuth = require('../middleware/check_auth')

router.get('/', horarioController.get_all_horarios);
router.post('/', horarioController.insert_horario);
router.get('/:idHorario', horarioController.get_horario);
router.patch('/:idHorario', horarioController.edit_horario);

/* Rotas com permissões */
/*

*/

module.exports = router;