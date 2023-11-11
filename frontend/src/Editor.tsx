import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  LinearProgress,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { sendNote } from "./api";
import { HelperCat } from "./HelperCat";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const { isFetching, isSuccess, data } = useQuery(
    "sendNote",
    () => sendNote(editorRef.current?.value as string),
    {
      enabled: !!editorRef.current?.value && isSubmitted,
      onSuccess: () => setSubmitted(false),
    }
  );

  return (
    <Container>
      <DiaryFormContainer>
        <StyledTextareaAutosize
          ref={editorRef}
          placeholder="Please, describe your problem in detail..."
        />
        {isFetching && <StyledLinearProgress />}
        <SubmitButton variant="contained" onClick={() => setSubmitted(true)}>
          Submit
        </SubmitButton>
      </DiaryFormContainer>
      <HelperCat suggestions={!isFetching && isSuccess ? data : undefined} />
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
});

const DiaryFormContainer = styled("div")({
  width: "70%",
});

const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: "100%",
  minHeight: "300px",
});

const StyledLinearProgress = styled(LinearProgress)({
  width: "100%",
  marginTop: "8px",
});

const SubmitButton = styled(Button)({
  marginTop: "8px",
});

export { Editor };
