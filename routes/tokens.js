const express = require("express");
const router = express.Router();
const { newAccessJWT } = require("../controllers/token")

router.all("/new-access-jwt", newAccessJWT);


module.exports = router;