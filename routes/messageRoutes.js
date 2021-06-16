const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

router
    .route('/send')
    .post(MessageController.sendMessage);
router
    .route('/getBySender')
    .post(MessageController.getBySender);
router
    .route('/getByRecepient')
    .post(MessageController.getByRecepient);
router
    .route('/getAll')
    .post(MessageController.getAll);

module.exports = router;