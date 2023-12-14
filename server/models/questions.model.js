// models/question.js
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'options', 'checkbox']
  },
  options: [String], // Only used if type is 'options' or 'checkbox'
  answer: {
    type: mongoose.Schema.Types.Mixed, // Can be a string or an array of strings
    default: null
  }
});

export default mongoose.model('Question', QuestionSchema);
