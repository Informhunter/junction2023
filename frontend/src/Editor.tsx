import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  Typography,
  LinearProgress,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { sendNote } from "./api";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const { isLoading, isSuccess, data } = useQuery(
    "sendNote",
    () => sendNote(editorRef.current?.value as string),
    {
      enabled: !!editorRef.current?.value && isSubmitted,
      onSuccess: () => setSubmitted(false),
    }
  );

  return (
    <React.Fragment>
      <StyledTextareaAutosize
        ref={editorRef}
        placeholder="Please, describe your problem..."
      />
      {isLoading && <StyledLinearProgress />}
      {isSuccess && (
        <React.Fragment>
          <Typography>This can help you!</Typography>
          <code>{JSON.stringify(data)}</code>
        </React.Fragment>
      )}
      <SubmitButton variant="contained" onClick={() => setSubmitted(true)}>
        Submit
      </SubmitButton>
    </React.Fragment>
  );
};

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
