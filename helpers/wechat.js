const WechatAPI = require('wechat-api');
const wechat = require('wechat');
const {promisify} = require('util');
const config = require('../config/config');

const appID = config.wechat.appID;
const appSecret = config.wechat.appSecret; 
const token = config.wechat.token;
const templateID = config.wechat.templateID;
const dest = config.wechat.templateDest;
const checkSignature = false;

const wxAPI = new WechatAPI(appID, appSecret)
const sendTemplate = promisify(wxAPI.sendTemplate).bind(wxAPI)

const wxMiddlewareBuilder = function (textFn, eventFn) {
  return wechat({ token, appID, checkSignature }).text(textFn).event(eventFn).middlewarify()
}

const wxPush = async function (openID, text) {
  let data = {
    content: {
      value: text,
      color: '#173177'
    }
  }
  return sendTemplate(openID, templateID, dest, data)
}

module.exports = {
  wxMiddlewareBuilder,
  wxPush
}

