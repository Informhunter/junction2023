import React from "react";
import { RandomNumber } from "../RandomNumber";
import { Core } from "../Core";

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <RandomNumber />
      <Core />
    </React.Fragment>
  );
};

export { HomePage }
