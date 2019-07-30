const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); const cookieParser = require('cookie-parser');
const users = require('./router/users');
const topics = require('./router/topics');
const wechat = require('./router/wechat');
const NKNClient = require('./util/nkn');
const { wxPush } = require('./util/wechat');
const Topics = require("./models/topics");
const Users = require("./models/users");
//TODO log

var db = mongoose.connect('mongodb://localhost:27017/myDbs',{ useNewUrlParser: true });


global.nknClient = new NKNClient({username:"pubsubserver001", password:"pwd"});

nknClient.on('connect', () => {
    console.log( 'connected to NKN node' );
});

nknClient.on('message', (src, payload, payloadType, encrypt) => {
  if (payloadType === NKNClient.PayloadType.TEXT) {
    console.log('Receive text message:', src, JSON.parse(payload));
  } else if (payloadType === NKNClient.PayloadType.BINARY) {
    console.log('Receive binary message:', src, payload);
  }
  console.log('Message is', encrypt ? 'encrypted' : 'unencrypted');
    let text=JSON.parse(payload)
    Topics.findByTopic(text.topic, (err, topic) => {
        if (!err) {
		topic[0].subscribers.forEach(subscriber => {
			Users.findByName(subscriber, (err, user) => {
				if (!err) {
					console.log(user[0].userid, text.data);
					wxPush(user[0].userid, text.data)
				}
			})
		});
        }
    });
});

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', users)
app.use('/api/v1/topics', topics)
app.use('/wx', wechat)


app.listen(80,() => {
    console.log('app listening on port 3001.')
})

