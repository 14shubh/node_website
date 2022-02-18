const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('<h1>hello</h1>');
});

module.exports = router;