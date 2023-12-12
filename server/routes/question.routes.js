// routes/question.routes.js
import express from 'express';
import * as questionController from '../controllers/question.controller.js';

const router = express.Router();

router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

export default router;