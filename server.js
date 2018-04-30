const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('ssl/meadowlark.pem', 'utf8');
const certificate = fs.readFileSync('ssl/meadowlark.crt', 'utf8');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const authRouter = require('./routers/auth');
const postRouter = require('./routers/post');
const commentRouter = require('./routers/comment');

const mongoose = require('mongoose');
const cors = require('cors');
const ejs = require('ejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const config = require('./config/config');

const credentials = { key: privateKey, cert: certificate };
const app = express();

const { databaseURL } = config[process.env.NODE_ENV];
mongoose.connect(databaseURL);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// middlewares
app.use(cors());
// app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/public`);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

authRouter(app);
postRouter(app);
commentRouter(app);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

console.log('Server listening at port 8443');

module.exports = app;
