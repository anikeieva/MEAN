const express = require('express');
const authController = require('../controllers/position');

const router = express.Router();

router.get('/:categoryId' , authController.getByCategoryId);
router.post('/' , authController.create);
router.patch('/:id' , authController.update);
router.delete('/:id' , authController.remove);

module.exports = router;
