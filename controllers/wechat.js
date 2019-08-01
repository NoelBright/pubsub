const express = require("express");
const {wxMiddlewareBuilder} = require('../helpers/wechat');
const Logger = require('../helpers/logger');
const UserService = require('../services/userService');
const TopicService = require("../services/topicService");

const logger = Logger.getLogger("wechat");
const router = express.Router();
const userService = new UserService();
const topicService = new TopicService();

router.use('/', wxMiddlewareBuilder((message, req, res, next) => {
    logger.info("text:",message);
    return res.reply({
      type: 'text',
      content:'ok'
    });
}, (message, req, res, next) => {
    logger.info("event:",message);
    if(message.Event == 'subscribe') {
	//TODO get first
	userService.createUser({
	    "name": message.FromUserName,
	    "userid": message.FromUserName
	}).then(user => {
	    return topicService.updateTopic("noelbright2", message.FromUserName);
	}).then(topic => {
	    userService.updateUser(message.FromUserName, ["noelbright2"]);
	});
    } else if (message.Event == 'unsubscribe') {
    }

    return res.reply(1);
}));

module.exports = router;
