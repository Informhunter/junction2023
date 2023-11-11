import { createTheme } from "@mui/material/styles";

interface Colors {
  orange: string;
  blue: string;
  gray: string;
  red: string;
  white: string;
}

declare module "@mui/material/styles" {
  interface Palette extends Colors {}
  interface PaletteOptions extends Colors {}
}

const theme = createTheme({
  palette: {
    orange: "#ef856e",
    blue: "#30699d",
    gray: "#343540",
    red: '#f02637',
    white: '#fbfbfb',
  },
});

export default theme;
