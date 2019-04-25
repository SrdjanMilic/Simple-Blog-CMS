'use strict';

const express = require('express'); // Minimalist web framework for Node.js

const dotenv = require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before handlers
const cors = require('cors'); // Handle CORS (Cross-Origin Resource Sharing)
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken'); // JSON Web Tokens for authentication
const bcrypt = require('bcryptjs'); // A library to hash passwords.

const app = express();
const router = express.Router();
app.use(cors());

router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(bodyParser.json());

// Create database with tables on server initialization
const database = new sqlite3.Database("./sqlite3.db");

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
const createUser = (user, cb) => {
  return database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err, rows) => {
    cb(err, rows);
  });
};

const findUserByEmail = (email, cb) => {
  return database.get(`SELECT * FROM users WHERE email = ?`, email, (err, rows) => {
    cb(err, rows);
  });
};

const secret = 'emdzZiQjv3LJfcf4wk1mvzSQqPuubruEaLJ2-asCxaA'; // JWT secret
const expiresIn = 24 * 60 * 60; // Token expires in seconds...

// ### RESTFul API - START

// user registration endpoint
router.post('/api/v1/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password);

  createUser([name, email, password], (err) => {
    if (err) return res.status(400).send('Bad request!\n');
    findUserByEmail([email], (err, user) => {
      if (err) return res.status(400).send('No such user.\n');

      const token = jwt.sign({
        UserId: user.id,
        Name: user.name
      }, secret, {
          expiresIn: expiresIn
        });
      res.status(200).send({
        "user": user,
        "token": token,
        "expiresIn": expiresIn
      });
    });
  });

  console.log(req.body);

});

// user login endpoint
router.post('/api/v1/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  findUserByEmail([email], (err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) return res.status(404).send('User not found!');

    const result = bcrypt.compareSync(password, user.password);

    if (!result) return res.status(401).send('Password not valid!');

    const token = jwt.sign({
      UserId: user.id,
      Name: user.name
    }, secret, {
        expiresIn: expiresIn
      });
    res.status(200).send({
      "user": user,
      "token": token,
      "expiresIn": expiresIn
    });
  });

  console.log(req.body);

});

// Create article endpoint
const createArticle = (article, cb) => {
  return database.run(`INSERT INTO articles (title, content, user_id) VALUES (?,?,?)`, article, (err, rows) => {
    cb(err, rows);
  });
};

router.post('/api/v1/create-article', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.user_id;

  createArticle([title, content, userId], (err) => {
    if (err) return res.status(400).send('Bad request!\n');
    res.status(200).send({
      "title": title,
      "content": content,
      "userId": userId
    });
  });

  console.log(req.body);

});

// Update article endpoint
const updateArticle = (update, cb) => {
  return database.run(`UPDATE articles SET title = ?, content = ? WHERE id = ?`, update, (err, rows) => {
    cb(err, rows);
  });
};

router.put('/api/v1/update-article', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.body.id;

  updateArticle([title, content, id], (err) => {
    if (err) return res.status(400).send('Bad request! Check for duplicate titles.\n');
    res.status(200).send({
      "title": title,
      "content": content,
      "id": id
    });
  });

  console.log(req.body);

});

// Delete article endpoint
const deleteArticle = (del, cb) => {
  return database.run(`DELETE FROM articles WHERE id = ?`, del, (err, rows) => {
    cb(err, rows);
  });
};

router.delete('/api/v1/delete-article/:id', (req, res) => {
  const id = req.params.id;

  deleteArticle([id], (err) => {
    if (err) return res.status(400).send('Bad request!\n');
    res.status(200).send({
      "id": id
    });
    console.log(req.body);
  });

});

// List all articles endpoint
const listArticles = (list, cb) => {
  return database.all(`SELECT * FROM articles`, list, (err, rows) => {
    cb(err, rows);
  });
};

router.get('/api/v1/list-articles', (req, res) => {
  const object = req.body.object;
  listArticles([object], (err, object) => {
    if (err) return res.status(500).send('Server error!');
    if (!object) return res.status(404).send('Articles not found!');
    res.status(200).send({
      "articles": object
    });

    console.log(req.body);

  });
});

// Read one article endpoint
const readArticle = (id, cb) => {
  return database.all(`SELECT * FROM articles WHERE id = ?`, id, (err, rows) => {
    cb(err, rows);
  });
};

router.get('/api/v1/read-article/:id', (req, res) => {
  const id = req.params.id;
  readArticle([id], (err, id) => {
    if (err) return res.status(500).send('Server error!');
    if (!id) return res.status(404).send('Articles not found!');
    res.status(200).send({
      "articles": id
    });

    console.log(req.body);

  });
});

// Find articles by user id in articles table endpoint
const findUserArticles = (user_id, cb) => {
  return database.all(`SELECT * FROM articles INNER JOIN users ON articles.user_id = users.id WHERE articles.user_id = ?`, user_id, (err, rows) => {
    cb(err, rows);
  });
};

router.get('/api/v1/find-articles/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  findUserArticles([user_id], (err, user_id) => {
    if (err) return res.status(500).send('Server error!');
    if (!user_id) return res.status(404).send('Articles not found!');
    res.status(200).send({
      "articles": user_id
    });

    console.log(req.body);

  });
});

// ### RESTFul API - END


app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Server listening at http://localhost:' + process.env.PORT);
});

router.get('/', (req, res) => {
  res.status(200).send('This is an authentication server.');
});

// Check for connection errors
if (dotenv.error) {
  throw result.error;
}

console.log(dotenv.parsed);

