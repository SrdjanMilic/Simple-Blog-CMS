'use strict';

const express = require('express');
const router = express.Router();

const sqlite3 = require('../db-handler.js');
const database = new sqlite3.Database('../sqlite-database/sqlite3.db');

const logger = (req, res, next) => {
  console.log(req.query);
  next();
};

router.use(logger);

// List all articles
const listArticles = (data, callback) => {
  return database.all('SELECT * FROM articles', data, (err, rows) => {
    callback(err, rows);
  });
};

router.get('/api/v1/list-articles', (req, res, next) => {
  listArticles(req.body.object, (err, articles) => {
    if (err) return res.status(500).send('Server error!');
    res.status(200).send({
      'articles': articles
    });
  });
});

// List one article
const readArticle = (data, callback) => {
  return database.all('SELECT * FROM articles WHERE id = ?', data, (err, rows) => {
    callback(err, rows);
  });
};

router.get('/api/v1/list-articles/:id', (req, res) => {
  readArticle(req.params.id, (err, article) => {
    if (err) return res.status(500).send('Server error!');
    if (article == '') return res.status(404).send('Article not found!');
    res.status(200).send({
      'article': article
    });
  });
});

// Find all articles from user
const findUserArticles = (data, callback) => {
  return database.all('SELECT * FROM articles INNER JOIN users ON articles.user_id = users.id WHERE articles.user_id = ?', data, (err, rows) => {
    callback(err, rows);
  });
};

router.get('/api/v1/user-articles/:user_id', (req, res) => {
  findUserArticles(req.params.user_id, (err, userId) => {
    if (err) return res.status(500).send('Server error!');
    if (userId == '') return res.status(404).send('User not found!');
    res.status(200).send({
      'articles': userId
    });
  });
});

// Create article
const createArticle = (article, callback) => {
  return database.run('INSERT INTO articles (title, content, user_id) VALUES (?,?,?)', article, (err, rows) => {
    callback(err, rows);
  });
};

router.post('/api/v1/create-article', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.user_id;

  createArticle([title, content, userId], (err) => {
    if (err) return res.status(400).send('Bad request! Check for duplicate titles.\n');
    res.status(200).send({
      'title': title,
      'content': content,
      'user_id': userId
    });
  });
});

// Update article
const updateArticle = (update, callback) => {
  return database.run('UPDATE articles SET title = ?, content = ? WHERE id = ?', update, (err, row) => {
    callback(err, row);
  });
};

router.put('/api/v1/update-article', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.body.id;

  updateArticle([title, content, id], (err) => {
    if (err) return res.status(400).send('Bad request! Check for duplicate titles.\n');
    res.status(200).send({
      'title': title,
      'content': content,
      'id': id
    });
  });
});

// Delete article
const deleteArticle = (id, callback) => {
  return database.run('DELETE FROM articles WHERE id = ?', id, (err, row) => {
    callback(err, row);
  });
};

router.delete('/api/v1/delete-article/:id', (req, res) => {
  const articleId = req.params.id;

  deleteArticle(articleId, (err) => {
    if (err) return res.status(400).send('Bad request! Check article id.\n');
    res.status(200).send({
      'article_id': articleId
    });
  });
});

module.exports = router;
