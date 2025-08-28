const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


router.post('/', async (req, res) => {
    const { first_name, other_name, email, phone, state, lga, organization } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Save the user with 'pending' status
        const user = await User.create({
            first_name,
            other_name,
            email,
            //password: hashedPassword,
            phone,
            status: 'pending', 
            state,
            lga,
            organization,
            token: verificationToken 
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'neimsdashboard2023@gmail.com',
                pass: process.env.MAIL_KEY, 
            },
        });

        const mailOptions = {
            from: 'neimsdashboard2023@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: \n http://localhost:3000/api/verifyemail?token=${verificationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error sending verification email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Registration successful. Please verify your email.' });
            }
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user', details: err.message });
    }
});

module.exports = router;