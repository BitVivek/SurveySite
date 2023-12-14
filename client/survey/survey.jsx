import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { listSurveys } from "./api-survey"; // This should be your API call to list surveys

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  card: {
    textAlign: "center",
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
}));

export default function SurveyList() {
  const classes = useStyles();
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listSurveys(signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSurveys(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className={classes.root}>
      {surveys.map((survey, i) => (
        <Card key={i} className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              {survey.title}
            </Typography>
            <Typography
              type="subheading"
              component="h2"
              className={classes.subheading}
            >
              {survey.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {error && (
        <Typography component="p" color="error">
          <Icon color="error" className={classes.error}>
            error
          </Icon>
          {error}
        </Typography>
      )}
    </div>
  );
}
