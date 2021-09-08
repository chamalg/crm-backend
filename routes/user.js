const express = require('express');
const router = express.Router();

const { insert, insert2 } = require('../controllers/user');


router.post('/', insert);

router.post('/2', async (req, res) => {
    try {

        const result = await insert2(req.body);

        res.json({ message: "New user created", result: result })

    } catch (error) {
        console.log(error);
        res.json(({ status: "error", message: error.message }))
    }

});

module.exports = router;