const express = require("express");
const TopicService = require("../services/topicService");
const Logger = require('../helpers/logger');

const logger = Logger.getLogger('topics');
const router = express.Router();
const topicService = new TopicService();


router.get("/", (req, res) => {
    topicService.getTopicList().then(topics => {
        res.json(topics);
    }).catch(err => {
        res.json(err);
    });
});

router.get("/:topic", (req, res) => {
    topicService.getTopicByName(req.params.topic).then(topic => {
        res.json(topic);
    }).catch(err => {
        res.json(err);
    });
});

router.post("/", (req, res) => {
    topicService.createTopic(req.body).then(topic => {
        res.json(topic);
    }).catch(err => {
        res.json(err);
    });
});

router.put("/:topic", (req, res) => {
    topicService.updateTopic(req.params.topic, req.body).then(topic => {
        res.json(topic);
    }).catch(err => {
        res.json(err);
    });
});

router.delete("/:topic", (req, res) => {
    topicService.deleteTopic(req.params.topic).then(topic => {
        res.json(topic);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;
