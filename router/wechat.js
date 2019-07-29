const express = require("express");
const { wxMiddlewareBuilder } = require('../util/wechat');


const router = express.Router();

router.use('/', wxMiddlewareBuilder(async (message, req, res, next) => {
    return res.reply({
      type: 'text',
      content
    });
}));

module.exports = router;
