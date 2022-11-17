const authApi = require('express').Router();
const controller = require('~/controllers/auth.controller');
const passport = require('passport');
require('~/middleware/passport.middleware');

authApi.post('/register', controller.postRegisterAccount);
authApi.post('/login', controller.postLogin);
authApi.post(
  '/login/google',
  passport.authenticate('google-one-tap', {
    scope: ['profile', 'email'],
    session: false,
  }),
  controller.postGoogleLogin,
);

module.exports = authApi;
