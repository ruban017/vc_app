import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Transparent grey background
    '&:hover': {
      backgroundColor: 'rgba(128, 128, 128, 0.7)', // Slightly less transparent on hover
    },
    position: 'relative', // For positioning the close button
    cursor: 'pointer', // Change cursor to pointer
  },
  fullscreen: {
    video: {
      width: '1000px',
      [theme.breakpoints.down('xs')]: {
        width: '1000px',
      },
    },
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // backgroundColor: 'black',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    zIndex: 1001,
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const classes = useStyles();

  const handleFullScreen = (videoType) => {
    setIsFullscreen(true);
    setFullscreenVideo(videoType);
  };

  const closeFullScreen = () => {
    setIsFullscreen(false);
    setFullscreenVideo(null);
  };

  return (
    <>
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper} onClick={() => handleFullScreen('myVideo')}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper} onClick={() => handleFullScreen('userVideo')}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
              <video playsInline ref={userVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
      </Grid>
      {isFullscreen && (
        <div className={classes.fullscreen}>
          <IconButton className={classes.closeButton} onClick={closeFullScreen}>
            <CloseIcon />
          </IconButton>
          <video
            playsInline
            muted={fullscreenVideo === 'myVideo'}
            ref={fullscreenVideo === 'myVideo' ? myVideo : userVideo}
            autoPlay
            className={classes.video}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
