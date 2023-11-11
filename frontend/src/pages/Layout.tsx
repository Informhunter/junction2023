import React from "react";
import { Box, styled } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png";

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
        sx={{ height: 170, width: 250 }}
        alt="Logo"
        src={logo}
      />
      <nav>
        <ul>
          {ROUTES.map((route) => (
            <NavItem key={route.link}>
              <StyledLink to={route.link}>{route.label}</StyledLink>
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
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </div>
  );
};

const HeaderContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const NavItem = styled("li")({
  display: "inline",
  marginRight: "8px",
});

const StyledLink = styled(Link)(({ theme: { palette } }) => ({
  color: palette.orange,
  fontSize: "24px",
}));

const OutletContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
});

export { Layout };
