MyanLearn Pre-interview Coding Assignment
=========================================

Please visit https://myanlearn-client.herokuapp.com/ to test the app.

This SPA (Single Page Application ) is built using:
* Node.js
* MongoDB
* React.js
* Redux (for state management)
* Redux Form
* React-Router (V3)
* Bootstrap 4

This app has 3 main UIs which are Register, Login and Tweets.

How To Test The App
===================

Register
-------
To register a new user, you'll need to provide a valid username, password and password confirmation.
* username must not contain spaces and special characters
* username must not be in use
* password and password confirmation must match

Login
-----
After you have registered you can log into the app.
* try to log in with wrong username, password and empty fiels
* if you are successfully logged in, you'll be redirected to `Tweet` page

Tweet with #education hashtag
-----------------------------
You cannot not visit this route if you are not logged in. If you try to do so, you will be redirected back to log in page.

* after logging in, you can view the tweets. You can refresh the page or even close the browser, and still accessible to this page (thanks to JWT credentials)
* as soon as you log out, you'll not be able to visit this route

Overview of App Architecture
============================
Server
------
The server is built using Node and Express. It's main purpose is to provide API end-points for authentication and twitter posts. Local strategy is used to authenticate the user when they sign up or log in. After that, JWT tokens (instead of cookies) are used to make authenticated requests. Passport.js (middleware) is used protect the routes and authenticate the request. Mongoose.js is used to interact with mongoDB.

Client
------
On the client side, React.js and react-router are used to render UI and make API calls, handle the routes. Redux and redux-form are used to manage the application states, to handle and validate the form-inputs.

How To Run the App Locally
==========================

* clone the github repo
* navigate to the directory
* install dependencies with npm install (you must have node installed on your pc)
* npm start / npm run start
