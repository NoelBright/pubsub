const NKNClient = require('../helpers/nkn');
const {wxPush} = require('../helpers/wechat');
const {getLogger} = require("../helpers/logger");
const Topics = require("../models/topics");
const Users = require("../models/users");
const config = require("../config/config");

const logger = getLogger('nknService');

const nknClient = new NKNClient({username: config.walletName, password:"pwd"});

nknClient.on('connect', function () {
    logger.info( 'connected to NKN node' );
});

nknClient.on('message', function (src, payload, payloadType, encrypt) {
    if (payloadType !== NKNClient.PayloadType.TEXT) {
        logger.info('Receive text message:', src, JSON.parse(payload));
        return "Can not support this payload type."
    }

    let msg = JSON.parse(payload)

    Topics.findByTopic(msg.topic).then(topic => {
        if (topic.length === 0) {
            logger.warn(`the topic "${msg.topic}" is not existed`)
            return
        }

        topic[0].subscribers.forEach(subscriber => {
            Users.findByName(subscriber).then(user => {
                logger.info(`send to wechatid "${user[0].userid}" with message "${msg.content}"`);
                wxPush(user[0].userid, msg.content)
            }).catch(err => {
                logger.error("cannot get user: ", err)
            });
        })
    }).catch(err => {
            logger.error("cannot get topic: ", err)
    });

    return 'Well received!';
});

module.exports = nknClient;
