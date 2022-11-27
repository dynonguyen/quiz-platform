const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/my-groups', controller.getMyGroups);
groupApi.get('/joined-groups', controller.getJoinedGroups);
groupApi.get('/:groupId/members', controller.getGroupMembers);
groupApi.post('/join', controller.postJoinGroupByCode);
groupApi.post('/invite', controller.postInviteJoinGroup);
groupApi.post('/new', controller.postCreateGroup);

module.exports = groupApi;
