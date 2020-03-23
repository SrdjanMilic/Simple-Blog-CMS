const express = require('express'); // Import express - minimalist web framework for Node.js
const router = express.Router();

const jwt = require('jsonwebtoken'); // JSON Web Tokens for authentication
const bcrypt = require('bcryptjs'); // A library to hash passwords.

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('../sqlite-database/sqlite3.db');

// Create users in database
const createUser = (user, callback) => {
    return database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err, rows) => {
        callback(err, rows);
    });
};

const findUserByEmail = (email, callback) => {
    return database.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
        callback(err, row);
    });
};

const secret = 'emdzZiQjv3LJfcf4'; // JWT secret
const expiresIn = 24 * 60 * 60; // Token expires in seconds...

// User registration
router.post('/api/v1/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    createUser([name, email, password], (err) => {
        if (err) return res.status(500).send('Server error! Email already registered!\n');
        findUserByEmail([email], (err, user) => {
            if (err) return res.status(500).send('Server error!\n');

            const token = jwt.sign({
                UserId: user.id,
                Name: user.name
            }, secret, {
                expiresIn: expiresIn
            });
            res.status(200).send({
                'user': user,
                'token': token,
                'expires_in': expiresIn
            });
        });
    });
});

// User login
router.post('/api/v1/login', (req, res, next) => {
    findUserByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        if (!user) return res.status(404).send('User not found!');

        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPassword) return res.status(401).send('Password not valid!');

        const token = jwt.sign({
            UserId: user.id,
            Name: user.name
        }, secret, {
            expiresIn: expiresIn
        });
        res.status(200).send({
            'user': user,
            'token': token,
            'expires_in': expiresIn
        });
        next();
    });
});

module.exports = router;