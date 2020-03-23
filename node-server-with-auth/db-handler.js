const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('../sqlite-database/sqlite3.db');

module.exports = {

    // Create Users table
    createUsersTable: () => {
        const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT)`;

        return database.run(sqlQuery);
    },

    // Create Articles table
    createArticlesTable: () => {
        const sqlQuery = `
        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY,
          title TEXT UNIQUE,
          content TEXT,
          user_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id))`;

        return database.run(sqlQuery);
    },

}

module.exports = database;
module.exports = sqlite3;