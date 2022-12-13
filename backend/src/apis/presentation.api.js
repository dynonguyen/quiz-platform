const presentationApi = require('express').Router();
const controller = require('~/controllers/presentation.controller');

presentationApi.get('/get-by-code', controller.getPresentationByCode);
presentationApi.get('/list', controller.getMyPresentation);
presentationApi.get('/check-code', controller.getCheckCode);
presentationApi.post('/new', controller.postNewPresentation);
presentationApi.put('/update', controller.putUpdatePresentation);
presentationApi.delete('/:presentationId', controller.deletePresentation);
module.exports = presentationApi;
