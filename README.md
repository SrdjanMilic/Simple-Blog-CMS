# Simple Blog CMS
Angular blog platform in a form of CMS, very easy to use and simple to implement.  

## Requirements
Required: Nodejs with npm

## Back-end initialization
cd ../node-server-with-auth

- npm i
- npm start

This will start node server on port 3000.

## Front-end initialization
cd ../angular-frontend

- npm i
- ng serve
- open your browser on http://localhost:4200/

alternatively:

- ng serve --open (starts angular server and open tab in browser)

## General notes
- There can't be users with same email address.
- There can't be articles with same title name.
- There is console.log output for almost every action, so you can follow the output in terminal.

## Features
- register
- login/logout
- list all articles
- list one article
- admin panel (visible after login)
- create article
- update article
- delete articles
- form input checking and validation
- guarded routes
- JWT authorization

## Waithing to be implemented and fixed
- there is no working pagination yet
- there is no file up-loader for images
- there is no editor formating options
- you need to manually enter the user id when creating the article
- you need to manually enter the article id when editing articles
- there is no search articles options (should be handled by pagination)
- unsuccessful login lack the UI alert
- edit article page doesn't show current articles

## Tech stack
- Angular 2
- TypeScript
- Material design
- Node.js
- Express
- RESTful API
- JWT authorization

## Login credentials for the app
johndoe@email.com  
123456789
