'use strict';

const express = require('express'); // Import express - minimalist web framework for Node.js
const dotenv = require('dotenv').config(); // Load environment variables from .env file
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before handlers
const cors = require('cors'); // Handle CORS (Cross-Origin Resource Sharing)
const jwt = require('jsonwebtoken'); // JSON Web Tokens for authentication
const bcrypt = require('bcryptjs'); // A library to hash passwords.

const app = express(); // Instantiate the app
const router = express.Router();

app.use(cors());
app.use(router);

// Import and mount the articles
const articlesRouter = require('./articlesRouter.js');
app.use(articlesRouter);

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
router.use(bodyParser.json());

const database = new sqlite3.Database('./sqlite3.db');

// Create Users table
const createUsersTable = () => {
  const sqlQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT)`;

  return database.run(sqlQuery);
};

// Create Articles table
const createArticlesTable = () => {
  const sqlQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY,
      title TEXT UNIQUE,
      content TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id))`;

  return database.run(sqlQuery);
};

createUsersTable();
createArticlesTable();

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
        'expiresIn': expiresIn
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
      'expiresIn': expiresIn
    });
    next();
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

router.get('/', (req, res) => {
  res.status(200).send('This is an authentication server.');
});

// Check for connection errors
if (dotenv.error) {
  throw dotenv.error;
}

console.log(dotenv.parsed);
