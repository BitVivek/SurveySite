import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSurvey, getQuestionById } from "./api-survey"; // Import your API function
// Add other necessary imports

export default function FillSurvey() {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status
  const history = useHistory();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const fetchedSurvey = await getSurvey(surveyId);
        setSurvey(fetchedSurvey);
        // Fetch each question's details and set them in state
        const questionDetails = await Promise.all(
          fetchedSurvey.questions.map((questionId) =>
            getQuestionById(questionId)
          )
        );
        setQuestions(questionDetails);

        // Initialize answers state
        const initialAnswers = questionDetails.reduce((acc, question) => {
          acc[question._id] = question.answer || "";
          return acc;
        }, {});
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleCheckboxChange = (questionId, option, isChecked) => {
    if (isChecked) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: prevAnswers[questionId]
          ? [...prevAnswers[questionId], option]
          : [option],
      }));
    } else {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: prevAnswers[questionId].filter((opt) => opt !== option),
      }));
    }
  };

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case "options":
        return question.options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={question._id}
              value={option}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              checked={answers[question._id] === option}
            />
            {option}
          </label>
        ));
      case "checkbox":
        return (
          <div>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  name={question._id}
                  value={option}
                  onChange={(e) =>
                    handleCheckboxChange(question._id, option, e.target.checked)
                  }
                  checked={
                    answers[question._id] &&
                    answers[question._id].includes(option)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type="text"
            value={answers[question._id]}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
          />
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = {
      surveyId: surveyId, // assuming surveyId is obtained from useParams()
      responses: Object.keys(answers).map((questionId) => ({
        questionId,
        answer: answers[questionId],
      })),
    };

    try {
      // Send a POST request to your server endpoint
      const response = await fetch(
        "http://localhost:3000/surveys/submit/survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if needed
          },
          body: JSON.stringify(responseData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setIsSubmitted(true); // Set isSubmitted to true after successful submission
      setTimeout(() => history.push("/"), 3000);
      console.log("Survey submitted successfully:", result);
      // Handle success - e.g., show a success message or redirect
    } catch (error) {
      console.error("Error submitting survey:", error);
      // Handle error - e.g., show an error message
    }
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  if (isSubmitted) {
    return <div>Thank you for taking the survey! Redirecting...</div>;
  }

  return (
    <div className="survey-form">
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question._id} className="question">
            <label>{question.text}</label>
            <div className="question-input">
              {renderQuestionInput(question)}
            </div>
          </div>
        ))}
        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}
