const express = require('express');
const { killApplication } = require('../controllers/logoutController');

const router = express.Router();

router.get('/', killApplication);

module.exports = router;
