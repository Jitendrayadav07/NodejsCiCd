'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Response = require('../classes/Response');

function signToken(payload) {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign(payload, secret, { expiresIn });
}

async function signup(req, res, next) {
    try {
        const { full_name, email, password } = req.body;
        if (!full_name || !email || !password) {
            return res.status(400).json(Response.sendResponse(false, null, 'full_name, email, password required', 400));
        }

        const existing = await db.users.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json(Response.sendResponse(false, null, 'Email already in use', 409));
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await db.users.create({ full_name, email, password: passwordHash });
        const token = signToken({ id: user.id, email: user.email });

        const safeUser = { id: user.id, full_name: user.full_name, email: user.email };
        res.status(201).json(Response.sendResponse(true, { user: safeUser, token }, 'Signup successful', 201));
    } catch (err) {
        console.error(err)
        res.status(500).json(Response.sendResponse(false, null, 'Internal server error', 500));
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(Response.sendResponse(false, null, 'email and password required', 400));
        }
        const user = await db.users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json(Response.sendResponse(false, null, 'Invalid credentials', 401));
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json(Response.sendResponse(false, null, 'Invalid credentials', 401));
        }
        const token = signToken({ id: user.id, email: user.email });
        const safeUser = { id: user.id, full_name: user.full_name, email: user.email };
        res.json(Response.sendResponse(true, { user: safeUser, token }, 'Login successful', 200));
    } catch (err) {
        next(err);
    }
}

module.exports = { signup, login };


