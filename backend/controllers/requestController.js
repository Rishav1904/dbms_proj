const { validationResult } = require('express-validator');
const Request = require('../models/Request');

const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { usn_no } = req.body;
        const request = await Request.findOne({ usn_no });
        if(request) {
            return res.status(400).json({ errors: [{ msg: 'Request already exists' }] });
        }
        const newRequest = new Request({
            usn_no
        });
        await newRequest.save();
        res.json({ success: true, request: newRequest });
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: 'Server error occurred' }] });
    }
}

const getAll = async (req, res) => {
    try {
        const requests = await Request.find({ read: false });
        res.json({ success: true, requests });
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: 'Server error occurred' }] });
    }
}

const markAsRead = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { usn_no } = req.body;
        const request = await Request.findOneAndUpdate(
            { usn_no },
            { read: true },
            { new: true }
        );
        if (!request) {
            return res.status(404).json({ errors: [{ msg: 'Request not found' }] });
        }
        res.json({ success: true, request });
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: 'Server error occurred' }] });
    }
}

module.exports = {
    register,
    getAll,
    markAsRead
}