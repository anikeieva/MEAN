const express = require('express');
const passport = require('passport');

const authController = require('../controllers/position');
const passportAuthenticate = require('../utils/passport-authenticate');

const router = express.Router();

router.get(
    '/:categoryId',
    passportAuthenticate(passport),
    authController.getByCategoryId
);
router.post(
    '/',
    passportAuthenticate(passport),
    authController.create
);
router.patch(
    '/:id',
    passportAuthenticate(passport),
    authController.update
);
router.delete(
    '/:id',
    passportAuthenticate(passport),
    authController.remove
);

module.exports = router;
