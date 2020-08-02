const express = require('express');
const passport = require('passport');

const authController = require('../controllers/position');

const router = express.Router();

router.get(
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    authController.getByCategoryId
);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    authController.create
);
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    authController.update
);
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    authController.remove
);

module.exports = router;
