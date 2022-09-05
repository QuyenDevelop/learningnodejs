// setup the auth router
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/AuthControl");

// ---- test connection auth router
router.get("/", (request, response) => response.send("hải mặt lồn óc tó"));

// ---- router Post api/auth/register
router.post("/register", register);

// ---- Post api/auth/login
router.post("/login", login);

module.exports = router;
