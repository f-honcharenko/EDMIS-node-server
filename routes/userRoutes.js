const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router
    .route('/register')
    .post(UserController.register);
router
    .route('/login')
    .post(UserController.login);
router
    .route('/update')
    .post(UserController.update);
router
    .route('/updateOther')
    .post(UserController.updateOther);
router
    .route('/verify')
    .post(UserController.verify);
router
    .route('/findbytoken')
    .post(UserController.findByToken);
router
    .route('/findbylogin')
    .post(UserController.findByLogin);
router
    .route('/getAllUsers')
    .post(UserController.getAllUsers);
router
    .route('/delete')
    .delete(UserController.delete);

module.exports = router;