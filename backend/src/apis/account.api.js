const accountApi = require('express').Router();
const controller = require('~/controllers/account.controller');

accountApi.get('/check-verified', controller.checkVerified);
accountApi.post('/send-activate', controller.postSendActivateAccount);
accountApi.post('/activate', controller.postActivateAccount);
accountApi.get('/check-password', controller.checkIsPasswordExist);
accountApi.post('/check-password', controller.checkIsMatchPassword);
accountApi.post('/update-password', controller.postUpdatePassword);

module.exports = accountApi;
