// routes/survey.routes.js
import express from 'express';
import * as surveyController from '../controllers/survey.controller.js';

const router = express.Router();

router.post('/surveys', surveyController.createSurvey);
router.get('/surveys', surveyController.getAllSurveys);
router.get('/surveys/:id', surveyController.getSurvey);
router.put('/surveys/:id', surveyController.updateSurvey);
router.delete('/surveys/:id', surveyController.deleteSurvey);

export default router;

