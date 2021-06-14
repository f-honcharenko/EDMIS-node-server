//REQUIRES
const express = require('express');
const testRoutes = require('./testRoutes');
const adminRoutes = require('./adminRoutes');
//REQUIRES

const router = express.Router();

router.use('/tests', testRoutes);
router.use('/admin', adminRoutes);

module.exports = router;