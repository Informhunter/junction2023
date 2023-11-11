import React from "react";
import { Box, Tooltip, Typography, styled } from "@mui/material";
import activeCat from "./assets/cat-active.png";
import sleepCat from "./assets/cat-sleep.png";
import { Suggestion } from "./api";

interface HelperCatProps {
  suggestions: Suggestion[] | undefined;
}

const HelperCat: React.FC<HelperCatProps> = ({ suggestions }) => {
  const hasSuggestion = !!suggestions;

  return (
    <Tooltip
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            borderRadius: '16px',
            bgcolor: 'gray',
            '& .MuiTooltip-arrow': {
              color: 'gray',
            },
          },
        },
      }}
      title={
        <TooltipContent>
          <Typography>
            {hasSuggestion
              ? "This can help you! 😊"
              : "I'll help you as soon as you share your feelings with me 🙏"}
          </Typography>
          <code>{JSON.stringify(suggestions, null, "\t")}</code>
        </TooltipContent>
      }
    >
      <Box
        component="img"
        sx={{
          height: 170,
          width: hasSuggestion ? 200 : 250,
          marginTop: "50px",
        }}
        alt="Сat assistant"
        src={hasSuggestion ? activeCat : sleepCat}
      />
    </Tooltip>
  );
};

const TooltipContent = styled("div")({
  padding: "16px",
  fontSize: "16px",
});

export { HelperCat };
