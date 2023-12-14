// routes/question.routes.js
import express from 'express';
import * as questionController from '../controllers/question.controller.js';

const router = express.Router();

router.post('/surveys/questions', questionController.createQuestion);
router.get('/surveys/questions', questionController.getAllQuestions);
router.get('/surveys/questions/:id', questionController.getQuestion);
router.put('/surveys/questions/:id', questionController.updateQuestion);
router.delete('/surveys/questions/:id', questionController.deleteQuestion);

export default router;