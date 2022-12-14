const presentationApi = require('express').Router();
const controller = require('~/controllers/presentation.controller');

presentationApi.get('/get-by-code', controller.getPresentationByCode);
presentationApi.get('/list', controller.getMyPresentation);
presentationApi.get('/check-code', controller.getCheckCode);
presentationApi.post('/new', controller.postNewPresentation);
presentationApi.put('/update', controller.putUpdatePresentation);
presentationApi.get(
  '/:presentationId/:slideId/:userId',
  controller.checkUserAnswered,
);
presentationApi.delete('/:presentationId', controller.deletePresentation);
module.exports = presentationApi;
