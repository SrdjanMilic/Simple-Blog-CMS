'use strict';

const express = require('express'); // Import express - minimalist web framework for Node.js
const dotenv = require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before handlers
const cors = require('cors'); // Handle CORS (Cross-Origin Resource Sharing)

const app = express(); // Instantiate the app
const router = express.Router();

const dbTables = require('./db-handler.js');

const articles = require('./controlers/articles-controler.js');

const users = require('./controlers/users-controler.js');

app.use(cors());
app.use(router);

// Import and mount the articles
app.use(articles);

// Import and mount the users
app.use(users);

// create database tables
dbTables.createUsersTable;
dbTables.createArticlesTable;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
router.use(bodyParser.json());

app.listen(process.env.DB_PORT, () => {
  console.log(`Server is listening...`);
});

router.get('/', (req, res) => {
  res.status(200).send('This is an authentication server.');
});

// Check for connection errors
if (dotenv.error) {
  throw dotenv.error;
}

console.log(dotenv.parsed);

