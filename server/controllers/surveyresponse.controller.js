import SurveyResponse from '../models/survey.reponses.js'

// Create a survey response
const createResponse = async (req, res) => {
  try {
    console.log("Somethinggggg")
    const { surveyId, responses } = req.body;

    let surveyResponse = new SurveyResponse({ surveyId, responses });
    surveyResponse = await surveyResponse.save();
    res.status(201).json(surveyResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a survey response
const deleteResponse = async (req, res) => {
  try {
    const response = await SurveyResponse.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getResponses = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const responses = await SurveyResponse.find({surveyId: surveyId} );
    res.json(responses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// You can add more controller methods as needed for updating or fetching survey responses.
export { createResponse,deleteResponse, getResponses };
