const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/say-something', (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
});

module.exports = router;