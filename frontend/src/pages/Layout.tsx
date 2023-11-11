import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import logo from '../assets/logo.png'

const ROUTES = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/authors",
    label: "Authors",
  },
];

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Box
        component="img"
        sx={{ height: 233, width: 350 }}
        alt="Logo"
        src={logo}
      />
      <nav>
        <ul>
          {ROUTES.map((route) => (
            <NavItem key={route.link}>
              <Link to={route.link}>{route.label}</Link>
            </NavItem>
          ))}
        </ul>
      </nav>
    </HeaderContainer>
  );
};

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <hr />
      <Outlet />
    </div>
  );
};

const HeaderContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const NavItem = styled('li')({
  display: "inline",
  marginRight: "8px",
});

export { Layout };