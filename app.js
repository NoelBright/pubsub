const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); const cookieParser = require('cookie-parser');
const users = require('./router/users');
const topics = require('./router/topics');
const wechat = require('./router/wechat');
const NKNClient = require('./util/nkn');
//const a = require('./util/wechat');
//TODO log

var db = mongoose.connect('mongodb://localhost:27017/myDbs',{ useNewUrlParser: true });


global.nknClient = new NKNClient({username:"pubsubserver001", password:"pwd"});

nknClient.on('connect', () => {
    console.log( 'connected to NKN node' );
});

nknClient.on('message', (...args) => {
    console.log('Received message:', ...args);
});


const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', users)
app.use('/api/v1/topics', topics)
app.use('/wx', wechat)

app.use(function (req, res, next) {
  if (!res.headersSent) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  }
})


app.listen(3001,() => {
    console.log('app listening on port 3001.')
})

