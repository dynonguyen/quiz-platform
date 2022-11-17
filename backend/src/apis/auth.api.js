const authApi = require('express').Router();
const controller = require('~/controllers/auth.controller');

authApi.post('/register', controller.postRegisterAccount);
authApi.post('/login', controller.postLogin);

module.exports = authApi;
