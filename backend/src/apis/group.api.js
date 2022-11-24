const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/:groupID/members', controller.getGroup);

module.exports = groupApi;
