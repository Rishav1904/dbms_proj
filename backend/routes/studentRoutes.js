const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerStudent, getStudent, getAllStudents, updateStudent, deleteStudent, csvStudent } = require('../controllers/studentController');


// @route  POST api/student/register-student
// @desc   Register student
// @access Public
router.post('/register-student', [
    check('name', 'Name is required').not().isEmpty(),
    check('usn_no', 'USN must be in the format 4NI23IS168').matches(/^[1-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/),
    check('room_no', 'Room number is required').isLength(2),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Enter a valid contact number').isLength(10).isNumeric(),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar_no', 'Aadhar number must be exactly 12 digits').matches(/^[0-9]{12}$/),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], registerStudent);

// @route  POST api/student/get-student
// @desc   Get student by CMS ID
// @access Public
router.post('/get-student', [
    check('isAdmin', 'isAdmin is required').notEmpty(),
    check('token', 'You donot have a valid token').notEmpty()
], getStudent);

// @route  POST api/student/get-all-students
// @access Public
router.post('/get-all-students',[
    check('hostel', 'Hostel is required').not().isEmpty()
],
 getAllStudents);

// @route  POST api/student/update-student
// @desc   Update student
// @access Public
router.post('/update-student', [
    check('usn_no', 'USN No is required').not().isEmpty(),
    check('room_no', 'Room number is required').not().isEmpty(),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar_no', 'Aadhar No is required').not().isEmpty(),
    check('user', 'User is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty()
], updateStudent);

// @route  POST api/student/delete-student
// @desc   Delete student
// @access Public
router.delete('/delete-student', [
    check('id', 'Enter a valid ID').not().isEmpty(),
], deleteStudent);

// @route  POST api/student/csv
// @desc   Get CSV of students
// @access Public
router.post('/csv', [
    check('hostel', 'Hostel is required').not().isEmpty()
], csvStudent);


module.exports = router;

