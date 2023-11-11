import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { AuthorsPage } from "./pages/Authors";
import { Layout } from "./pages/Layout";
import "./reset.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="authors" element={<AuthorsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export { App };
