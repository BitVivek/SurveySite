// MySurveys.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  surveys: {
    padding: '24px',
  },
  addButton: {
    float: 'right',
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  surveyTitle: {
    color: theme.palette.primary.main,
  },
}));

export default function MySurveys(props) {
  const classes = useStyles();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch surveys for the user
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`/surveys/${props.userId}`);
        setSurveys(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSurveys();
  }, [props.userId]);

  return (
    <Card className={classes.surveys}>
      <Typography variant="h6" className={classes.title}>
        My Surveys
        <span className={classes.addButton}>
          <Link to="/create-survey">
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
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

MySurveys.propTypes = {
  userId: PropTypes.string.isRequired,
};
