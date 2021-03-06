import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  mainFont: "Poppins",
  primary: "#222831",
  secondary: "#00ADB5",
  lightenedDark: "#444",
  background: "#393939",
  darkBg: "#222",
  light: "#EEE",
  buttonBg: "#00ADB5",
  imageBg: "#00ADB5",
  buttonText: "#EEE",
  spotify: "#1ed760",
  maxContentWidth: "1000px",
};

export const Theme: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
