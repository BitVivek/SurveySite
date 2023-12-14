import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById, fetchSurveyResponses } from "./api-survey"; // Make sure to define these functions
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

export default function SurveyResponses() {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch survey responses
        const surveyResponses = await fetchSurveyResponses(surveyId);

        // Extract unique question IDs from responses
        const questionIds = [
          ...new Set(
            surveyResponses.flatMap((response) =>
              response.responses.map((r) => r.questionId)
            )
          ),
        ];

        // Fetch question details for each ID and create a map
        const questionDetails = await Promise.all(
          questionIds.map((id) => getQuestionById(id))
        );
        const questionMap = questionDetails.reduce((acc, question) => {
          acc[question._id] = question;
          return acc;
        }, {});

        setQuestions(questionMap);
        setResponses(surveyResponses);
      } catch (error) {
        console.error("Error fetching survey responses:", error);
      }
    }

    fetchData();
  }, [surveyId]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          {Object.values(questions).map((question) => (
            <TableCell key={question._id}>{question.text}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {responses.map((response, index) => (
          <TableRow key={index}>
            <TableCell>{/* User identifier goes here */}</TableCell>
            {Object.values(questions).map((question) => (
              <TableCell key={question._id}>
                {response.responses.find((r) => r.questionId === question._id)
                  ?.answer || "No response"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
