//REQUIRES
const express = require('express');
const testRoutes = require('./testRoutes');
//REQUIRES

const router = express.Router();

router.use('/tests', testRoutes);

module.exports = router;