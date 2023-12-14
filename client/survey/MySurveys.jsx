// MySurveys.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { useParams } from "react-router-dom";
import { listSurveysByUser } from "./api-survey";

const useStyles = makeStyles((theme) => ({
  surveys: {
    padding: "24px",
  },
  addButton: {
    float: "right",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  surveyTitle: {
    color: theme.palette.primary.main,
  },
  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  linkButton: {
    padding: theme.spacing(1),
  },
}));
var global_userId;
export default function MySurveys(props) {
  const classes = useStyles();
  const [surveys, setSurveys] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchSurveys = async () => {
      if (userId) {
        global_userId = userId;
        console.log("Glocal");
        console.log(global_userId);
        // Check if userId is available
        try {
          const surveys = await listSurveysByUser(userId);
          console.log("Responseeee");
          console.log(surveys);
          setSurveys(surveys);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSurveys();
  }, [userId]);

  return (
    <Card className={classes.surveys}>
      <Typography variant="h6" className={classes.title}>
        My Surveys
        <span className={classes.addButton}>
          <Link
            to={{
              pathname: "/create-survey",
              state: { userId: global_userId }, // Passing userId as state to the route
            }}
          >
            <Button color="primary" variant="contained">
              <Icon>add</Icon> New Survey
            </Button>
          </Link>
        </span>
      </Typography>
      <List>
        {surveys.map((survey, index) => (
          <ListItem key={index}>
            <Typography variant="body1" className={classes.surveyTitle}>
              {survey.title}
            </Typography>
            <div className={classes.linkContainer}>
              {/* Link to fill the survey */}
              <Link
                to={`/fill-survey/${survey._id}`}
                className={classes.linkButton}
              >
                <Button variant="outlined">Fill Survey</Button>
              </Link>
              {/* Link to view who filled the survey */}
              <Link
                to={`/survey-responses/${survey._id}`}
                className={classes.linkButton}
              >
                <Button variant="outlined">View Responses</Button>
              </Link>
              {/* Link to view the filled survey data */}
              {/* <Link
                to={`/survey-details/${survey._id}`}
                className={classes.linkButton}
              >
                <Button variant="outlined">Survey Details</Button>
              </Link> */}
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
