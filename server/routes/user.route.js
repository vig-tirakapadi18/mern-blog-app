const express = require("express");
const { testAPI } = require("../controllers/user.controller");
const router = express.Router();

router.get("/test", testAPI);

module.exports = router;