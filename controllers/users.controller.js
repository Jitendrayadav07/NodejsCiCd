'use strict';

const db = require('../models');
const Response = require('../classes/Response');

async function listUsers(req, res, next) {
    try {
        const users = await db.users.findAll();
        res.json(Response.sendResponse(true, users, 'Users fetched', 200));
    } catch (err) {
        next(err);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await db.users.findByPk(req.params.id);
        if (!user) return res.status(404).json(Response.sendResponse(false, null, 'User not found', 404));
        res.json(Response.sendResponse(true, user, 'User fetched', 200));
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const user = await db.users.create(req.body);
        res.status(201).json(Response.sendResponse(true, user, 'User created', 201));
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const user = await db.users.findByPk(req.params.id);
        if (!user) return res.status(404).json(Response.sendResponse(false, null, 'User not found', 404));
        await user.update(req.body);
        res.json(Response.sendResponse(true, user, 'User updated', 200));
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await db.users.findByPk(req.params.id);
        if (!user) return res.status(404).json(Response.sendResponse(false, null, 'User not found', 404));
        await user.destroy();
        res.json(Response.sendResponse(true, null, 'User deleted', 200));
    } catch (err) {
        next(err);
    }
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };


