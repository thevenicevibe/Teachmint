import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment-timezone';

const Clock = ({ selectedCountry }) => {
  const [currentTime, setCurrentTime] = useState(moment().tz(selectedCountry));
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setCurrentTime(moment().tz(selectedCountry));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry, isRunning]);

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="clock">
      <h2>Current Time</h2>
      <button onClick={handlePauseResume}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
      <Moment interval={1000} format="HH:mm:ss" tz={selectedCountry}>
        {currentTime}
      </Moment>
    </div>
  );
};

export default Clock;
