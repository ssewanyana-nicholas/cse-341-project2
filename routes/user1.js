const express = require('express');
const { body, param } = require('express-validator');
const usersController = require('../controllers/user1');
const handleValidationErrors = require('../middleware/handleValidationErrors');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', 
    param('id').isMongoId().withMessage('Invalid user ID'),
    handleValidationErrors,
    usersController.getSingle
);

router.post('/', 
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('location').notEmpty().withMessage('Location is required'),
    handleValidationErrors,
    usersController.createUser
);

router.put('/:id', 
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('location').notEmpty().withMessage('Location is required'),
    handleValidationErrors,
    usersController.updateUser
);

router.delete('/:id', 
    param('id').isMongoId().withMessage('Invalid user ID'),
    handleValidationErrors,
    usersController.deleteUser
);

module.exports = router;
