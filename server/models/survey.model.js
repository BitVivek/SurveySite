// models/survey.js
import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

export default mongoose.model('Survey', SurveySchema);
