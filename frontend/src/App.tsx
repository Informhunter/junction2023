import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Crew } from "./Crew";
import { RandomNumber } from "./RandomNumber";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Junction 2023!</h1>
      <Crew />
      <RandomNumber />
    </QueryClientProvider>
  );
}

export { App };
