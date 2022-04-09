const express = require('express');
const router = express.Router()
const PratosPrincipaisController = require("../controllers/pratosprincipais")
const checkAuth = require('../middleware/check_auth')

router.get('/', PratosPrincipaisController.get_all_pratosprincipais);
router.post('/', PratosPrincipaisController.insert_pratoprincipal);
router.get('/:idPratoPrincipal', PratosPrincipaisController.get_pratoprincipal);
router.patch('/:idPratoPrincipal', PratosPrincipaisController.edit_pratoprincipal);

/* Rotas com permissões */
/*

*/

module.exports = router;