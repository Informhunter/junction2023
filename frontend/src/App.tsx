import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { AuthorsPage } from "./pages/Authors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ROUTES = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/authors',
    label: 'Authors',
  }
];

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <nav>
        <ul>
          {ROUTES.map(route => (
            <li key={route.link}>
              <Link to={route.link}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </React.Fragment>
  );
};

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
