const presentationApi = require('express').Router();
const controller = require('~/controllers/presentation.controller');

presentationApi.get('/get-by-code', controller.getPresentationByCode);
presentationApi.get('/list', controller.getMyPresentation);
presentationApi.get('/check-code', controller.getCheckCode);
presentationApi.delete('/:presentationId', controller.deletePresentation);
presentationApi.post('/new', controller.postNewPresentation);

module.exports = presentationApi;
