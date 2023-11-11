import React from "react";
import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import logo from "./logo.png";

const Core: React.FC = () => {
  return (
    <div>
      <Box
        component="img"
        sx={{ height: 233, width: 350 }}
        alt="Logo"
        src={logo}
      />
      <br />
      <StyledTextareaAutosize placeholder="Please, describe your problem..."/>
      <br />
      <Button variant="contained">Submit</Button>
    </div>
  );
};

const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: '80%',
  minHeight: '300px',
});

export { Core };
