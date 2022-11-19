const accountApi = require('express').Router();
const controller = require('~/controllers/account.controller');

accountApi.get('/check-verified', controller.checkVerified);
accountApi.post('/send-activate', controller.postSendActivateAccount);
accountApi.post('/activate', controller.postActivateAccount);

module.exports = accountApi;
