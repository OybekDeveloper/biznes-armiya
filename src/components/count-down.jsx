import React, { useState, useEffect } from 'react';
export function getLocalISOString() {
  const now = new Date();
  const localTimeOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localISOTime = new Date(now - localTimeOffset)
    .toISOString()
    .slice(0, -1); // Remove the 'Z'
  return localISOTime;
}
const Countdown = ({ eventTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(eventTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(eventTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  function calculateTimeRemaining(eventTime) {
    // Convert eventTime to the target timezone
    const targetDate = new Date(eventTime);
    const now = new Date();

    // Adjust for timezone offset (in hours) if necessary
    const timezoneOffsetInHours = 5; // Adjust this value based on your timezone difference
    const adjustedTargetDate = new Date(targetDate.getTime() - timezoneOffsetInHours * 60 * 60 * 1000);

    const timeRemaining = adjustedTargetDate - now;

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


