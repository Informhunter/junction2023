import React, { useState, useEffect } from 'react';
import { fetchRandomNumber } from './api';

function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState(undefined);
  
  useEffect(() => {
    fetchRandomNumber().then(({ number }) => setRandomNumber(number));
  }, []);

  return (
    <h2>Random number: {randomNumber}</h2>
  )
};

export { RandomNumber };