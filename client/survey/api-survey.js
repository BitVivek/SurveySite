const BASE_URL = 'http://localhost:3000/surveys'; // Adjust this based on your actual API endpoint

export const createQuestion = async (questionData) => {
  // Send POST request to create question
  const response = await fetch(`${BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questionData)
  });

  if (!response.ok) throw new Error(`Question creation failed: ${response.statusText}`);

  const createdQuestion = await response.json();
  return createdQuestion._id; // Return the ID of the created question
}

export const createSurvey = async  (surveyData, questionIds, userId) => {
  // Include question IDs and userId in survey data
  surveyData.questions = questionIds;
  surveyData.userId = userId;
  console.log(surveyData)
  console.log(questionIds)
  // Send POST request to create survey
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(surveyData)
  });

  if (!response.ok) throw new Error(`Survey creation failed: ${response.statusText}`);

  const createdSurvey = await response.json();
  return createdSurvey; // Return the created survey object
}

export const listSurveysByUser = async (userId) => {
  try {
    let response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};

export const getSurvey = async (surveyId) => {
  try {
    let response = await fetch(`${BASE_URL}/detail/${surveyId}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error('Error fetching survey:', error);
    throw error;
  }
};

export const updateSurvey = async (surveyId, surveyData) => {
  try {
    let response = await fetch(`${BASE_URL}/${surveyId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyData)
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error updating survey:', error);
    throw error;
  }
};

export const deleteSurvey = async (surveyId) => {
  try {
    let response = await fetch(`${BASE_URL}/${surveyId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error deleting survey:', error);
    throw error;
  }
};


export const getQuestionById = async (questionid) => {
  try {
    let response = await fetch(`${BASE_URL}/questions/${questionid}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching survey:', error);
    throw error;
  }
};

export const fetchSurveyResponses = async (surveyId) => {
  try {
    const response = await fetch(`${BASE_URL}/responses/${surveyId}`);
    console.log("responsess")
    console.log(response);
    console.log("############")
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    throw error;
  }
};

export const listSurveys = async (signal) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      signal: signal,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error("Error fetching surveys:", error);
    throw error;
  }
};