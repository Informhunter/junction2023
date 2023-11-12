import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Tooltip, Typography, styled } from "@mui/material";
import activeCat from "../assets/cat-active.png";
import sleepCat from "../assets/cat-sleep.png";
import { Suggestion } from "../api";

const Links: React.FC<{ suggestions: Suggestion[] }> = ({ suggestions }) => {
  return (
    <ol style={{ marginLeft: "16px" }}>
      {suggestions.map((suggestion) => {
        return (
          <li key={suggestion.text}>
            <Link
              style={{ color: "white" }}
              to={suggestion.search_result.url}
              target="_blank"
            >
              {suggestion.search_result.title}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

const getTooltipText = (suggestions: Suggestion[] | undefined) => {
  if (!suggestions) return "Please, tell me more 🙏";

  const hasCriticalSeverityLevel = suggestions?.some(
    (suggestion) => suggestion.severity_level === "critical"
  );

  const isChitChat = suggestions?.some(
    (suggestion) => suggestion.type === "chit-chat"
  );

  if (isChitChat && suggestions !== undefined) {
    return <Typography>{suggestions[0].search_result.title}</Typography>;
  }

  if (!hasCriticalSeverityLevel) {
    return (
      <>
        <Typography>{suggestions[0].search_summary}</Typography>
        <Links suggestions={suggestions as Suggestion[]} />
      </>
    );
  }

  if (hasCriticalSeverityLevel) {
    return (
      <>
        <Typography>{suggestions[0].search_summary}</Typography>
        <EmergencyButton>Call 112!</EmergencyButton>
        <Links suggestions={suggestions as Suggestion[]} />
      </>
    );
  }
};

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
            borderRadius: "16px",
            bgcolor: "gray",
            "& .MuiTooltip-arrow": {
              color: "gray",
            },
          },
        },
      }}
      placement="left"
      title={<TooltipContent>{getTooltipText(suggestions)}</TooltipContent>}
    >
      <Box
        component="img"
        sx={{
          height: 170,
          width: hasSuggestion ? 200 : 250,
          marginTop: "8px",
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

const EmergencyButton = styled(Button)(({ theme: { palette } }) => ({
  backgroundColor: palette.red,
  marginBottom: "8px",
  color: palette.white,

  "&:hover": {
    backgroundColor: palette.red,
  },
}));

export { HelperCat };
