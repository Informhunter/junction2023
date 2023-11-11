import React from "react";
import { useQuery } from "react-query";
import { getRandomNumber } from "./api";

function RandomNumber() {
  const { isSuccess, data } = useQuery("randomNumber", getRandomNumber);

  return <h2>Random number: {isSuccess ? data.number : "Loading..."}</h2>;
}

export { RandomNumber };
