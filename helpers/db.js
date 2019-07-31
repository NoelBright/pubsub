const mongoose = require("mongoose");
const Logger = require("./logger");
const config = require("../config/config");

const logger = Logger.getLogger("mongodb");

mongoose.connect(config.mongdbURL,{ useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    logger.info(`Mongoose connection open to ${config.mongdbURL}`);
});

mongoose.connection.on('error',function (err) {
    logger.error('Mongoose connection error' + err);
    process.exit(1);
});

mongoose.connection.on('disconnected', function () {
    logger.warn('Mongoose connection disconnected');
});

module.exports = mongoose;
