// CreateSurvey.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory, useLocation } from "react-router-dom";
import { createSurvey, createQuestion } from "./api-survey"; // Adjust the import path as necessary

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  questionCard: {
    marginTop: theme.spacing(2),
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    padding: theme.spacing(2),
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

const defaultQuestion = () => ({
  text: "",
  type: "text",
  options: ["Option 1", "Option 2"],
  answer: "",
});

export default function CreateSurvey() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const userId = location.state?.userId;
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
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
    setSurvey({
      ...survey,
      questions: [...survey.questions, defaultQuestion()],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = survey.questions.filter((_, idx) => idx !== index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    try {
      // Validate the survey data before sending
      if (!survey.title) {
        throw new Error("Survey title is required.");
      }

      // Further validations can be added here as needed

      // Create questions first and get their IDs
      const questionPromises = survey.questions.map(async (question) => {
        // Assuming you have an API function to create a question
        const response = await createQuestion(question);
        console.log(response);
        return response; // Assuming the question ID is returned in the response
      });

      // Wait for all questions to be created and collect their IDs
      const questionIds = await Promise.all(questionPromises);

      // Now create the survey with the question IDs
      const surveyToSubmit = {
        ...survey,
        questionIds: questionIds, // Include question IDs in the survey
      };
      console.log(questionIds);
      console.log("Userss");
      console.log(userId);
      // Call the createSurvey function from api-survey.js with the survey data
      const createdSurvey = await createSurvey(survey, questionIds, userId);

      // If the survey is created successfully, you can redirect
      // to a different page or display a success message
      console.log("Survey created successfully:", createdSurvey);

      // Redirect to the survey list page or dashboard
      history.push("/your-surveys-path"); // Adjust the path as necessary
    } catch (error) {
      // Handle errors such as validation errors or API errors
      console.error("Error creating survey:", error);
      // You could set an error state and display it in the UI
      // setError(error.message);
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
          {["options", "checkbox"].includes(question.type) && (
            <div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <TextField
                    label={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...survey.questions];
                      updatedQuestions[index].options[optIndex] =
                        e.target.value;
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
                  updatedQuestions[index].options.push(
                    `Option ${question.options.length + 1}`
                  );
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

      <Button
        color="primary"
        variant="contained"
        onClick={handleSubmit}
        className={classes.submit}
      >
        Submit Survey
      </Button>
    </div>
  );
}
