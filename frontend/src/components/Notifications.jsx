import React, { useContext, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      audioRef.current = new Audio('incoming.mp3');
      audioRef.current.play();
    } else if (callAccepted) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [call.isReceivingCall, callAccepted]);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
