import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {list} from './api-shop.js'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  body:{
    padding: theme.spacing(3, 2.5, 2),
    background: 'linear-gradient(to bottom, #8bc1e8, #6eb3e6)',
    height: '100vh'
  },
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.primary.dark,
    textShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontSize: 35,
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  }
}))
export default function Shops(){
  const classes = useStyles()
  const [shops, setShops] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setShops(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

    return (
    <div className={classes.body}>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Surveys
        </Typography>
        <List dense>
          {shops.map((shop, i) => {
            return <Link to={"/shops/"+shop._id} key={i}>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}  src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()}/>
                </ListItemAvatar>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.shopTitle}>
                    {shop.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {shop.description}
                  </Typography>
                </div>
              </ListItem>
              <Divider/>
            </Link>})}
        </List>
      </Paper>
    </div>)
}
