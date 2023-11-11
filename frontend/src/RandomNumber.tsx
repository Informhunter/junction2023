import React, { useState, useEffect } from 'react';
import { getRandomNumber } from './api';

function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    getRandomNumber().then(({ data }) => setRandomNumber(data.number));
  }, []);

  return (
    <h2>Random number: {randomNumber}</h2>
  )
};

export { RandomNumber };