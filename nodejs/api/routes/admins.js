const express = require('express');
const router = express.Router();
const AdminController = require("../controllers/admins")
const checkAuth = require('../middleware/check_auth')

router.get('/', AdminController.get_all_admins);
router.post('/', AdminController.insert_admin);
router.get('/:idAdmin', AdminController.get_admin);
router.patch('/:idAdmin', AdminController.edit_admin);
router.post('/login', AdminController.login)
router.patch('/editPassword/:idAdmin', AdminController.edit_admin_password);

/* Rotas com permissões */
/*
router.get('/', checkAuth.auth_todos, AdminController.get_all_admins);
router.post('/', checkAuth.auth_administrador, AdminController.insert_admin);
router.get('/:idAdmin', checkAuth.auth_todos, AdminController.get_admin);
router.patch('/:idAdmin', checkAuth.auth_administrador, AdminController.edit_admin);
router.post('/login', checkAuth.auth_administrador, AdminController.login)
router.patch('/editPassword/:idAdmin', checkAuth.auth_administrador, AdminController.edit_admin_password);
*/

module.exports = router;