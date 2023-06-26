import { blue, grey, lightBlue } from "@mui/material/colors";

export const themeColors = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: blue[500],
            white: "#fff",
          },
          secondary: {
            main: lightBlue[800],
            midNightBlue: "white",
          },
        }
      : {
          primary: {
            main: "#003366",
            white: "#003366",
          },
          secondary: {
            main: blue[500],
            midNightBlue: "#2196f3",
          },
          background: {
            default: "#1e1e1e",
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
