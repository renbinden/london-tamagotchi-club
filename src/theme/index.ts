import { createTheme } from "@mui/material";
import { sourGummy } from "@/theme/fonts";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d7437f",
    },
    background: {
      default: "#2b2a6f",
      paper: "#2b2a6f",
    },
  },
  typography: {
    fontFamily: sourGummy.style.fontFamily,
    h1: {
      fontSize: "5rem",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "8px solid rgba(255, 255, 255, 0.3)",
        },
      },
    },
  },
});

export default theme;
