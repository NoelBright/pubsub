const express = require('express');
const bodyParser = require("body-parser"); 
const cookieParser = require('cookie-parser');
const routers = require('./controllers/index');
const errHandler = require("./middlewares/errorHandler");

const Logger = require('./helpers/logger');
const config = require('./config/config');


const logger = Logger.getLogger('app');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
Logger.use(app, 'request');
app.use(routers);
app.use(errHandler);

app.listen(config.port, () => {
    logger.info(`app listening on port ${config.port}`)
})

