const Topics= require('../models/topics');
const Logger = require('../helpers/logger');
const nknService = require("./nknService");
const Util = require("../helpers/util");

const logger = Logger.getLogger("topicService");


class TopicService {
    async getTopicList() {
        try {
            let topicList = await Topics.find({}).sort({'ordinal': -1});
            return topicList;
        } catch (err) {
            return err;
        }
    }

    async getTopicByName(name) {
        try {
            let topic = await Topics.findByTopic(name);
            return topic;
        } catch (err) {
            return err;
        }
    }

    async createTopic(newTopic) {
        try {
            let topicID = Util.genTopicID(newTopic.topic);
            newTopic.topicid = topicID;

            let txID = await nknService.subscribe(topicID);
            logger.info('Subscription transaction:', txID);

            let topic = await Topics.create(newTopic);
            return topic;
        } catch (err) {
            logger.error(err)
            return err;
        }
    }

    async updateTopic(topicName, newSubscribers) {
        try {
            let topic = await Topics.findOneAndUpdate(
                {topic: topicName},
                {$push: {subscribers: newSubscribers}},
                {new: true}
            );
            return topic;
        } catch (err) {
            return err;
        }
    }

    async deleteTopic(topicName) {
        try {
            let topic = await Topics.findOneAndRemove({topic: topicName});
            return topic;
        } catch (err) {
            return err;
        }
    }
}

module.exports = TopicService;


