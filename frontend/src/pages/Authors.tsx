import React from 'react';
import { Authors } from '../Authors';
import { RandomNumber } from '../RandomNumber';

const AuthorsPage: React.FC = () => {
  return (
    <React.Fragment>
      <Authors />
      <RandomNumber />
    </React.Fragment>
  );
};

export { AuthorsPage };
