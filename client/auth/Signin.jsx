import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'

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
  error: {
    verticalAlign: 'middle'
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.primary.dark,
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontSize: 35,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
    <div className={classes.body}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      </div>
    )
}


