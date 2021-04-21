import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@chakra-ui/react";
import overrides from "./theme/theme";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={overrides}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
