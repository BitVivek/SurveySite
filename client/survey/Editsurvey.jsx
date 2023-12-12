import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import auth from './../auth/auth-helper'; // Adjust path as needed

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin: 30,
    },
    card: {
      textAlign: 'center',
      paddingBottom: theme.spacing(2)
    },
    title: {
      margin: theme.spacing(2),
      color: theme.palette.protectedTitle,
      fontSize: '1.2em'
    },
    subheading: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    error: {
      verticalAlign: 'middle'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
    bigAvatar: {
      width: 60,
      height: 60,
      margin: 'auto'
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  }))

export default function EditSurvey({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: '',
    description: '',
    redirect: false,
    error: ''
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`/surveys/${match.params.surveyId}`, { signal: signal });
        setValues({ ...values, title: response.data.title, description: response.data.description });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSurvey();
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.surveyId]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    let surveyData = {
      title: values.title,
      description: values.description
    };
    update({ surveyId: match.params.surveyId }, { t: jwt.token }, surveyData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to="/my-surveys" />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Survey
        </Typography>
        <TextField
          label="Title"
          id="title"
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        /><br/>
        <TextField
          label="Description"
          id="description"
          multiline
          rows="2"
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        /><br/>
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

EditSurvey.propTypes = {
  match: PropTypes.object.isRequired
};
