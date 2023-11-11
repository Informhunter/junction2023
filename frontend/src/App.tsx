import React from "react";
import { Crew } from "./Crew";
import { RandomNumber } from "./RandomNumber";

function App() {
  return (
    <React.Fragment>
      <h1>Junction 2023!</h1>
      <Crew />
      <RandomNumber />
    </React.Fragment>
  );
}

export { App };
