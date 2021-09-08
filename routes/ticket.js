const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) => {
    res.json({ Message: 'Return from express router' });
});

module.exports = router;