// controllers/survey.controller.js
import Survey from '../models/survey.model.js';

const createSurvey = async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSurvey = async (req, res) => {
  try {
    const survey = await Survey.find({userId: req.params.id});
    if (!survey) return res.status(404).send('Survey not found');
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSurveybyID = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).send('Survey not found');
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!survey) return res.status(404).send('Survey not found');
    res.json(survey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (!survey) return res.status(404).send('Survey not found');
    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createSurvey, getAllSurveys, getSurvey, updateSurvey, deleteSurvey, getSurveybyID};
