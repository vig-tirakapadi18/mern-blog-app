const express = require("express");
const { testAPI, updateUser, deleteUser, signOut } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.get("/test", testAPI);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/sign-out", signOut)

module.exports = router;