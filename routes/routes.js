const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');

// Route to create a new question (POST request)
route.post('/questions/create', controller.newQuestion); //create question route
route.post('/questions/:id/options/create', controller.createOption);//create option route
route.post('/options/:id/add_vote', controller.addVote);//add vote  route
route.delete('/questions/:id/delete', controller.deleteQuestion);//delete question route
route.delete('/options/:id/delete', controller.deleteOption);//delete option route
route.get('/questions/:id' , controller.viewQuestionsAndOptions)//view the question and option route



module.exports = route;
