const express = require("express");
const { wxMiddlewareBuilder,wxPush } = require('../helpers/wechat');


const router = express.Router();

router.use('/', wxMiddlewareBuilder(async (message, req, res, next) => {
    return res.reply({
      type: 'text',
      content
    });
}));

module.exports = router;
