const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/:groupId/members', controller.getGroupMembers);
groupApi.post('/join', controller.postJoinGroupByCode);

module.exports = groupApi;
