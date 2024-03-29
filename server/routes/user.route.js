const express = require("express");
const { testAPI, updateUser } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.get("/test", testAPI);
router.put("/update/:userId", verifyToken, updateUser);

module.exports = router;