import React, { useState, useEffect } from 'react';

const Countdown = ({ eventTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(eventTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(eventTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  function calculateTimeRemaining(eventTime) {
    
    const targetDate = new Date(eventTime);
    const now = new Date();
    const timeRemaining = targetDate - now;
    
    if (timeRemaining <= 0) {
      return 'Event has started!';
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return <div>{timeRemaining}</div>;
};

export default Countdown;
