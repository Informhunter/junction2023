import React from 'react';
import { Authors } from '../components/Authors';
import { RandomNumber } from '../components/RandomNumber';

const AuthorsPage: React.FC = () => {
  return (
    <React.Fragment>
      <Authors />
      <RandomNumber />
    </React.Fragment>
  );
};

export { AuthorsPage };
