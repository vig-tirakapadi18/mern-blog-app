const express = require("express");
const { signUp } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/sign-up", signUp);

module.exports = router;