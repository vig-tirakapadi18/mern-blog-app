const express = require("express");
const { testAPI, updateUser, deleteUser } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.get("/test", testAPI);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

module.exports = router;