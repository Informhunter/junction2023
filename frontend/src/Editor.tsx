import React from "react";
import { Button, TextareaAutosize, styled } from "@mui/material";

const Editor: React.FC = () => {
  return (
    <React.Fragment>
      <StyledTextareaAutosize placeholder="Please, describe your problem..."/>
      <br />
      <Button variant="contained">Submit</Button>
    </React.Fragment>
  );
};

const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: '80%',
  minHeight: '300px',
});

export { Editor };
