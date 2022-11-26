const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/:groupId/members', controller.getGroupMembers);

module.exports = groupApi;
