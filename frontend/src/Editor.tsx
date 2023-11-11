import React from "react";
import { Button, TextareaAutosize, styled } from "@mui/material";

const Editor: React.FC = () => {
  return (
    <React.Fragment>
      <StyledTextareaAutosize placeholder="Please, describe your problem..."/>
      <SubmitButton variant="contained">Submit</SubmitButton>
    </React.Fragment>
  );
};

const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: '80%',
  minHeight: '300px',
});

const SubmitButton = styled(Button)({
  marginTop: '8px',
});

export { Editor };
