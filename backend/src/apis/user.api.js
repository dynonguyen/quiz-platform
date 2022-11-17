const userApi = require('express').Router();
const controller = require('~/controllers/user.controller');

userApi.get('/info', controller.getUserInfo);

module.exports = userApi;
