import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  LinearProgress,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { sendNote } from "../api";
import { HelperCat } from "./HelperCat";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [shouldRequest, setShouldRequest] = useState(false);

  const { isFetching, data } = useQuery(
    ["sendNote", editorRef.current?.value],
    () => sendNote(editorRef.current?.value as string),
    {
      enabled: shouldRequest,
      onSuccess: () => setShouldRequest(false),
      onError: () => setShouldRequest(false),
    }
  );

  return (
    <Container>
      <DiaryFormContainer>
        <StyledTextareaAutosize
          defaultValue={`# Monday\nI feel a bit upset. My friend is moving to another country in a couple of days`}
          ref={editorRef}
          placeholder="Please, lay down your thoughts..."
        />
        {isFetching && <StyledLinearProgress />}
        <SubmitButton
          variant="contained"
          onClick={() => setShouldRequest(true)}
        >
          Submit
        </SubmitButton>
      </DiaryFormContainer>
      <HelperCat suggestions={data ?? []} />
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  width: "100%",
});

const DiaryFormContainer = styled("div")({
  width: "70%",
});

const StyledTextareaAutosize = styled(TextareaAutosize)(
  ({ theme: { palette } }) => ({
    width: "100%",
    minHeight: "25%",
    padding: "16px",
    border: `1px solid ${palette.blue}`,
    borderRadius: "4px",
    fontSize: "16px",

    "&:focus": {
      border: `1px solid ${palette.orange}`,
    },
  })
);

const StyledLinearProgress = styled(LinearProgress)({
  width: "100%",
  marginTop: "8px",
});

const SubmitButton = styled(Button)(({ theme: { palette } }) => ({
  marginTop: "8px",
  backgroundColor: palette.orange,

  "&:hover": {
    backgroundColor: palette.orange,
  },
}));

export { Editor };
