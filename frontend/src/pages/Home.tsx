import React from "react";
import { styled } from "@mui/material";
import { Editor } from "../Editor";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Editor />
    </Container>
  );
};

const Container = styled("div")({
  padding: "30px",
});

export { HomePage };
