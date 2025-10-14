'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'API root' });
});

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));

module.exports = router;


