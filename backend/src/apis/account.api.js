const accountApi = require('express').Router();
const controller = require('~/controllers/account.controller');

accountApi.get('/check-verified', controller.checkVerified);
accountApi.post('/send-activate', controller.postSendActivateAccount);
accountApi.post('/activate', controller.postActivateAccount);
accountApi.get('/checkpassword', controller.checkIsPasswordExist);
accountApi.post('/checkpassword', controller.checkIsMatchPassword);
accountApi.post('/updatepassword', controller.postUpdatePassword);
module.exports = accountApi;
