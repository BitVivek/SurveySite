import axios from 'axios';

const BASE_URL = '/surveys'; // Adjust this based on your actual API endpoint

export const createSurvey = async (surveyData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, surveyData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error creating survey:', error);
    throw error;
  }
};

export const listSurveysByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching surveys:', error);
    throw error;
  }
};

export const getSurvey = async (surveyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/detail/${surveyId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching survey:', error);
    throw error;
  }
};

export const updateSurvey = async (surveyId, surveyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${surveyId}`, surveyData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error updating survey:', error);
    throw error;
  }
};

export const deleteSurvey = async (surveyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${surveyId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error deleting survey:', error);
    throw error;
  }
};
