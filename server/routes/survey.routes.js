// routes/survey.routes.js
import express from 'express';
import * as surveyController from '../controllers/survey.controller.js';
import * as reponses from '../controllers/surveyresponse.controller.js'
const router = express.Router();

router.post('/surveys', surveyController.createSurvey);
router.get('/surveys', surveyController.getAllSurveys);
router.get('/surveys/:id', surveyController.getSurvey);
router.get('/surveys/detail/:id', surveyController.getSurveybyID);
router.put('/surveys/:id', surveyController.updateSurvey);
router.delete('/surveys/:id', surveyController.deleteSurvey);

//questions
router.post('/surveys/submit/survey', reponses.createResponse);
router.delete('/delete/question/:id', reponses.deleteResponse);
router.get('/surveys/responses/:id', reponses.getResponses);

export default router;

