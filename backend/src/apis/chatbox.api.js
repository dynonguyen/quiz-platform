const chatBoxApi = require('express').Router();
const controller = require('~/controllers/chatbox.controller');

chatBoxApi.get('/', controller.getChatBoxByPresentationId);
chatBoxApi.post('/new', controller.postAddNewChat);
chatBoxApi.put('/update', controller.putNewSeenUser);

module.exports = chatBoxApi;
