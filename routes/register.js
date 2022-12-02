/**
 *  Register Routes
 *  hots + /hitsAgency
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateRequest } = require('../middlewares/validateFields');
const { createUser, loginUser } = require('../controllers/register');

const router = Router();

router.post('/register', [
    check('idRole', 'The rol identifier is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password','The password should be a 8 character min').isLength({ min:8 }),
    validateRequest
], createUser);

router.post('/login', [
    check('email', 'Thje email is required').isEmail(),
    check('password','The password should be a 8 character min').isLength({ min:8 }),
    validateRequest
], loginUser);

module.exports = router;