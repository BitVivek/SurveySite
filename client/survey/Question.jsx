// Question.jsx
import React from 'react';
import { TextField, IconButton, FormControl, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Question({ id, question, handleQuestionChange, handleRemoveQuestion, handleAnswerChange }) {
  const renderAnswerField = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextField
            label="Answer"
            value={question.answer}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            fullWidth
            margin="normal"
          />
        );
      case 'options':
        return (
          <FormControl fullWidth margin="normal">
            <Select
              value={question.answer}
              onChange={(e) => handleAnswerChange(id, e.target.value)}
            >
              {question.options.map((option, idx) => (
                <MenuItem key={idx} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'checkbox':
        return (
          <div>
            {question.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={question.answer.includes(option)}
                    onChange={(e) => handleAnswerChange(id, option, e.target.checked)}
                  />
                }
                label={option}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TextField
        label={`Question ${id + 1}`}
        value={question.text}
        onChange={(e) => handleQuestionChange(id, e.target.value)}
        fullWidth
        margin="normal"
      />
      {renderAnswerField()}
      <IconButton onClick={() => handleRemoveQuestion(id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Question;
