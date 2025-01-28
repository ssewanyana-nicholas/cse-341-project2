const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db().collection('user1').find();
        result.toArray().then((user1) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user1);
        });
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('user1').find({ _id: userId });
        result.toArray().then((user1) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user1[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        };

        const result = await mongodb.getDatabase().db().collection('user1').insertOne(user);
        if (result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while creating the user.');
        }
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        };

        const result = await mongodb.getDatabase().db().collection('user1').replaceOne({ _id: userId }, user);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while updating the user.');
        }
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('user1').deleteOne({ _id: userId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the user.');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
