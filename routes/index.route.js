const express = require('express');
const router = express.router();


router.get('/', (req, res) => {
    console.log('hello');
});

module.exports = router;