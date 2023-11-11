import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Typography } from "@mui/material";
import { Authors } from "./Authors";
import { RandomNumber } from "./RandomNumber";
import { Core } from "./Core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Typography variant='h2'>Junction 2023!</Typography>
      <Authors />
      <RandomNumber />
      <Core />
    </QueryClientProvider>
  );
}

export { App };
