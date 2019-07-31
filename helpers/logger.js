const path = require('path');
const log4js = require('log4js');
const config = require('../config/config');


log4js.configure({
    appenders: {
        fileLog:  {
            type: 'file', 
            filename: path.join(__dirname, '../' + config.logFile), 
            maxLogSize: 1024,
            backups:4,
        },
        console: { 
            type: 'console' 
        }
    },
    categories: {
        file: { appenders: ['fileLog'], level: 'info' },
        another: { appenders: ['console'], level: 'info' },
        default: { appenders: ['console', 'fileLog'], level: 'info' }
    },
});

function use(app, name) {
    app.use(log4js.connectLogger(logger(name), {level:'auto', format:':method :url'}));
}

function logger(name) {
    var logger = log4js.getLogger(name);
    return logger;
}

logger("log").info("open log file: ", path.join(__dirname, '../' + config.logFile));

module.exports = {
    'getLogger': logger,
    'use': use
}
