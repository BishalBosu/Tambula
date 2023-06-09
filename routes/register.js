const express = require("express");

const registerController = require('../controllers/register')


const router = express.Router();

//has /user filter

router.post("/signup", registerController.postRegUsers);

router.post("/login", registerController.postLogIn);



module.exports = router;