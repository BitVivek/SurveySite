/*import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'

const useStyles = makeStyles(theme => ({ 
card: {
maxWidth: 600, 
margin: 'auto',
marginTop: theme.spacing(5) 
},
title: {
padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px 
${theme.spacing(2)}px`,
color: theme.palette.openTitle 
},
media: { 
minHeight: 400
} 
}))*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import surveyImg from './../assets/images/Survey.jpg';
   

const useStyles = makeStyles(theme => ({
  body:{
    padding: theme.spacing(3, 2.5, 2),
    background: 'linear-gradient(to bottom, #8bc1e8, #6eb3e6)',
    height: '100vh'
  },
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '18px',
    boxShadow: 3,
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.primary.contrastText,
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center'
  },
  media: {
    minHeight: 400,
    borderRadius: '8px',
    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)',
  },
  description: {
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontSize: 25,
    color: theme.palette.primary.contrastText,
  },
  footer: {
    position: 'absolute',
    marginTop: 'auto', 
    bottom: 0,
    textAlign: 'left',
    color: theme.palette.primary.light,
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
  },
}));

export default function Home(){ 
const classes = useStyles()
return (
  <div className={classes.body}>
    <Typography variant="h4" className={classes.title}><b>Welcome to the Survey Site!</b></Typography>
    <Typography variant="body2" component="p" className={classes.description}>
          In this site, you can create surveys on any subject of any type, in an instant!
        </Typography>
    <Card className={classes.card}>
      <CardMedia className={classes.media}
        image={surveyImg} title="Survey stock image." />
      <CardContent>
      <Typography variant="body2" component="p" >
      Create your survey today!
        </Typography>
      </CardContent>
    </Card>
    <footer className={classes.footer} variant="body1"><Typography>&copy; Stack Stackers &nbsp; (Group 3, COMP 229 SEC. 003)</Typography></footer>
  </div>
)
}

/*const MyComponent = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Card Title
        </Typography>
        <CardMedia
          className={classes.media}
          image={unicornbikeImg}
          title="Unicorn Bike"
        />
        <Typography variant="body2" component="p">
          Card content goes here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyComponent;*/

