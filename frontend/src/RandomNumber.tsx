import React from "react";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getRandomNumber } from "./api";

const RandomNumber: React.FC = () => {
  const { isSuccess, data } = useQuery("randomNumber", getRandomNumber);

  return (
    <Typography variant="h5">
      Random number: {isSuccess ? data.number : "Loading..."}
    </Typography>
  );
}

export { RandomNumber };
