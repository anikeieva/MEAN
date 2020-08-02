const express = require('express');
const passport = require('passport');

const controller = require('../controllers/order');
const passportAuthenticate = require('../utils/passport-authenticate');

const router = express.Router();

router.get(
    '/',
    passportAuthenticate(passport),
    controller.getAll
);
router.post(
    '/',
    passportAuthenticate(passport),
    controller.create
);

module.exports = router;
