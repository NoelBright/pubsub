const express = require("express");
const {wxMiddlewareBuilder} = require('../helpers/wechat');
const Logger = require('../helpers/logger');

const logger = Logger.getLogger("wechat");
const router = express.Router();

router.use('/', wxMiddlewareBuilder(async (message, req, res, next) => {
    logger.info(message, req);
    return res.reply({
      type: 'text',
      content
    });
}));

module.exports = router;
