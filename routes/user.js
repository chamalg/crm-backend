const express = require('express');
const router = express.Router();

const { insert, login } = require('../controllers/user');


router.post('/', insert);

router.post('/login', login)

module.exports = router;