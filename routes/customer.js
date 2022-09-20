//jshint esversion:6
const router = require('express').Router();
const customer = require('../controllers/customer.controller');


router.get("/login", customer.loginGet);

router.post("/register", customer.register);

router.post("/regsub", customer.regsub);

router.post("/login", customer.login);

module.exports = router;
