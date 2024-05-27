import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(128, 128, 128, 0.7)',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  typography: {
    color: 'black', 
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    fontFamily: 'Arial, sans-serif', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
    transition: 'color 0.3s ease', 
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.7)', 
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center" className={classes.typography}>VIDEO CHAT APP</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
