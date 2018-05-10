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
const config = require('./config/config');

const credentials = { key: privateKey, cert: certificate };
const app = express();

const { databaseURL } = config[process.env.NODE_ENV];
mongoose.connect(databaseURL);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// middlewares
app.use(cors());
// app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/public`);
app.set('view engine', 'ejs');

authRouter(app);
postRouter(app);
commentRouter(app);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

console.log('Server listening at port 8443');

module.exports = app;
