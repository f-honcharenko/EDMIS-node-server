const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
// const UsersService = require('../services/users.service');

router
    .route('/register')
    .post(AdminController.register);
router
    .route('/login')
    .post(AdminController.login);

module.exports = router;