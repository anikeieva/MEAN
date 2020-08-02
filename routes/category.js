const express = require('express');
const passport = require('passport');

const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const passportAuthenticate = require('../utils/passport-authenticate');

const router = express.Router();

router.get(
    '/',
    passportAuthenticate(passport),
    controller.getAll
);
router.get(
    '/:id',
    passportAuthenticate(passport),
    controller.getById
);
router.delete(
    '/:id',
    passportAuthenticate(passport),
    controller.remove
);
router.post(
    '/',
    passportAuthenticate(passport),
    upload.single('image'),
    controller.create
);
router.patch(
    '/:id',
    passportAuthenticate(passport),
    upload.single('image'),
    controller.update
);

module.exports = router;
