// CreateSurvey.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, Button, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  questionCard: {
    marginTop: theme.spacing(2),
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: theme.spacing(2),
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

const defaultQuestion = () => ({
  text: '',
  type: 'text',
  options: ['Option 1', 'Option 2'],
  answer: '',
});

export default function CreateSurvey() {
  const classes = useStyles();
  const history = useHistory();
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    questions: [defaultQuestion()],
  });

  const handleChange = (e) => {
    setSurvey({ ...survey, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setSurvey({ ...survey, questions: [...survey.questions, defaultQuestion()] });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = survey.questions.filter((_, idx) => idx !== index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/surveys', survey);
      console.log(response.data);
      // Redirect to the previous page after successful submission
      history.goBack();
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className={classes.card}>
      <TextField
        label="Survey Title"
        name="title"
        value={survey.title}
        onChange={handleChange}
        className={classes.textField}
        fullWidth
      />
      <TextField
        label="Survey Description"
        name="description"
        value={survey.description}
        onChange={handleChange}
        className={classes.textField}
        fullWidth
        multiline
        rows={4}
      />

      {survey.questions.map((question, index) => (
        <div key={index} className={classes.questionCard}>
          <div className={classes.questionHeader}>
            <TextField
              label={`Question ${index + 1}`}
              name="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(e, index)}
              fullWidth
            />
            <IconButton onClick={() => removeQuestion(index)}>
              <DeleteIcon />
            </IconButton>
          </div>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={question.type}
              onChange={(e) => handleQuestionChange(e, index)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="options">Options</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
            </Select>
          </FormControl>

          {/* Render options if the question type is 'options' or 'checkbox' */}
          {['options', 'checkbox'].includes(question.type) && (
            <div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <TextField
                    label={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...survey.questions];
                      updatedQuestions[index].options[optIndex] = e.target.value;
                      setSurvey({ ...survey, questions: updatedQuestions });
                    }}
                    fullWidth
                  />
                </div>
              ))}
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                  const updatedQuestions = [...survey.questions];
                  updatedQuestions[index].options.push(`Option ${question.options.length + 1}`);
                  setSurvey({ ...survey, questions: updatedQuestions });
                }}
              >
                Add Option
              </Button>
            </div>
          )}
        </div>
      ))}

      <Button startIcon={<AddCircleOutlineIcon />} onClick={addQuestion}>
        Add Question
      </Button>

      <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>
        Submit Survey
      </Button>
    </div>
  );
}
