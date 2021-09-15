const express = require('express');
const router = express.Router();

const { insert, login, getUser } = require('../controllers/user');
const { userAuthorization } = require('../middlewares/auth');


router.post('/', insert);

router.post('/login', login);

router.get('/', userAuthorization, getUser);

module.exports = router;