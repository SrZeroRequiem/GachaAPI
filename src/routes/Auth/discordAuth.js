const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/login", passport.authenticate("discord"));

router.get("/auth/redirect", passport.authenticate("discord", {
    failureRedirect: "/",
    successRedirect: "/login"
}));



module.exports = router;