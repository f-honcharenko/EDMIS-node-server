//REQUIRES
const express = require('express');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
//REQUIRES

const router = express.Router();

router.use('/user', userRoutes);
router.use('/msg', messageRoutes);

module.exports = router;