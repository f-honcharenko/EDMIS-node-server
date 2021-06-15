const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router
    .route('/register')
    .post(AdminController.register);
router
    .route('/login')
    .post(AdminController.login);
router
    .route('/update')
    .post(AdminController.update);
router
    .route('/delete')
    .delete(AdminController.delete);

module.exports = router;