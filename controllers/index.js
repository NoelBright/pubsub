const express = require("express");
const Users = require("./users");
const Topics = require("./topics");
const Wechat = require("./wechat");

const router = express.Router();

router.use('/api/v1/users', Users);
router.use('/api/v1/topics', Topics);
router.use('/wx', Wechat);

module.exports = router;

