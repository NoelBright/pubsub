const express = require("express");
const Topics = require("../models/topics");
const Util = require("../helpers/util");

const router = express.Router();

// 查询
router.get("/", (req, res) => {
    Topics.find({})
        .sort({ update_at: -1 })
        .then(topics=> {res.json(topics)})
        .catch(err => {res.json(err)});
});

// 通过topic查询
router.get("/:topic", (req, res) => {
    Topics.findByTopic(req.params.topic, (err, topic) => {
        if (err) {
            res.json(err);
        } else {
            res.json(topic);
        }
    });
});

// 添加
router.post("/", (req, res) => {
    let msg = req.body;
    let topicID = Util.genTopicID(msg.topic);
    msg.topicid = topicID;

    global.nknClient.subscribe(topicID)
        .then(txId => {
            console.log('Subscription transaction:', txId);
            Topics.create(msg, (err, msg) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(msg);
                }
            });
        })
        .catch(err => {
            console.log('Errored at subscribe. Already subscribed?', err);
        });
});

//更新
router.put("/:topic", (req, res) => {
    Topics.findOneAndUpdate(
        { topic: req.params.topic },
        { $push: { subscribers: req.body } },
        { new: true }
    )
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//删除
router.delete("/:topic", (req, res) => {
    Topics.findOneAndRemove({ topic: req.params.topic })
        .then(topic => res.send(`${topic.topic} delete successfully`))
        .catch(err => res.json(err));
});

module.exports = router;
