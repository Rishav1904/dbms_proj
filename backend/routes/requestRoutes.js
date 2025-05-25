const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, getAll, markAsRead } = require('../controllers/requestController');

// @route   POST api/request/register
// @desc    Register request
// @access  Public
router.post('/register', [
    check('usn_no', 'USN No is required').not().isEmpty()
], register);

// @route   GET api/request/getall
// @desc    Get all requests
// @access  Public
router.get('/getall', getAll);

// @route   POST api/request/mark-read
// @desc    Mark request as read
// @access  Public
router.post('/mark-read', [
    check('usn_no', 'USN No is required').not().isEmpty()
], markAsRead);

module.exports = router;