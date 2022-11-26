const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/:groupId/members', controller.getGroupMembers);
groupApi.post('/join', controller.postJoinGroupByCode);
groupApi.post('/invite', controller.postInviteJoinGroup);

module.exports = groupApi;
