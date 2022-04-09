const express = require('express');
const router = express.Router()
const tipoSenhasController = require("../controllers/tiposenhas")
const checkAuth = require('../middleware/check_auth')

router.get('/', tipoSenhasController.get_all_tiposenhas);
router.post('/', tipoSenhasController.insert_tiposenha);
router.get('/:idTipoSenha', tipoSenhasController.get_tiposenha);
router.patch('/:idTipoSenha', tipoSenhasController.edit_tiposenha);

/* Rotas com permissões */
/*

*/

module.exports = router;