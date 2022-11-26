const userApi = require('express').Router();
const controller = require('~/controllers/user.controller');

userApi.get('/info', controller.getUserInfo);
userApi.get('/info/:accountId, controller.getUserByID');

module.exports = userApi;
