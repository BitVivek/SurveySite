import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'

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
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
  submit: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontSize: 35,
    color: theme.palette.primary.dark
  },
}));

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }   
    return (<div className={classes.body}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}