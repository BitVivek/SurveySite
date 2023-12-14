import mongoose from 'mongoose';
const SurveyResponseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }]
});

export default mongoose.model('SurveyResponse', SurveyResponseSchema);
