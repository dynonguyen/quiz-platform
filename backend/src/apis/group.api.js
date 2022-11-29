const groupApi = require('express').Router();
const controller = require('~/controllers/group.controller');

groupApi.get('/my-groups', controller.getMyGroups);
groupApi.get('/joined-groups', controller.getJoinedGroups);
groupApi.get('/:groupId/members', controller.getGroupMembers);
groupApi.post('/join', controller.postJoinGroupByCode);
groupApi.post('/invite', controller.postInviteJoinGroup);
groupApi.post('/new', controller.postCreateGroup);
groupApi.post('/:groupId/members', controller.postTransferOwner);
groupApi.post(
  '/:groupId/members/addmorecoowner',
  controller.postAddMoreCoOwner,
);
groupApi.post('/:groupId/members/removecoowner', controller.postRemoveCoOwner);
groupApi.post('/:groupId/members/kickoutmember', controller.postKickOutMember);

module.exports = groupApi;
