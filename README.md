# Simple blog CMS

Blog CMS with basic features build with Angular 2 for front-end, material design for UI, Node.js with express framework for server side.

## Requirements and usage

Required: Node.js with npm

### Installation on OS Ubuntu based Linux distributions

- sudo apt install curl
- curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
- sudo apt-get install -y nodejs

This will install node.js v10.15.3 with npm v6.4.1

Alternatively, you could do "sudo apt install nodejs" for older version from default repository.

#### Linux Node server back-end initialization

cd ../node-server-with-auth

- npm update
- npm start

This will start node server on port 3000.

#### Linux Angular front-end initialization

cd ../angular-frontend

- npm update
- ng serve
- open your browser on http://localhost:4200/

alternatively:

- ng serve --open (starts angular server and open tab in browser)

### Installation on OS Windows 10

Download and install Node.js with npm from: https://nodejs.org/en/download/

#### Windows Node server back-end initialization

cd ..\node-server-with-auth

- npm update
- npm start

This will start node server on port 3000.

#### Windows Angular front-end initialization

- cd ..\angular-frontend
- npm update
- ng serve (take some time on Windows to start the compiler)
- open your browser on http://localhost:4200/

alternatively: ng serve --open (starts angular server and open tab in browser)

## General notes

**Please pay attention on the following details:**

- There can't be users with same email address.
- Article table has the FOREIGN KEY to reference the users table (relation).
- There can't be articles with same title name.
- There is console.log output for almost every action, so you can follow the output in terminal.

**There is two users already created:**

### First user

- name: John Doe
- email: johndoe@example.com
- passwd: 123456789
- id=1

### Second user

- name: Superman
- email: superman@example.com
- passwd: 123456789
- id=2

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
- material design

## DOWNFALLS

- there is no working pagination yet
- there is no file up-loader for images
- there is no editor formating options
- you need to manually enter the user id when creating the article
- you need to manually enter the article id when editing articles
- there is no search articles options (should be handled by pagination)
- unsuccessful login lack the UI alert
- edit article page doesn't show current articles

This downfalls will be sorted out eventually.

## SYSTEM Info

**Developed on:**  

Ubuntu 18.04.2  
node v10.15.3  
npm 6.4.1

**Tested on:**  

Kubuntu 18.04.2 live ISO image  
node v8.10.0  
npm 3.5.2  

Windows 10  
node v8.11.3  
npm 6.8.0
