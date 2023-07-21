import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { ModalContentContextProvider } from "./contexts/ModalContentContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  backgroundColor: "transparent",
                  "&.Mui-selected": {
                    bgcolor: "#F3EFEC",
                    "&.Mui-focusVisible": { background: "#F3EFEC" },
                  },
                  "&:hover": {
                    background: "#F3EFEC",
                  },
                },
              },
            },
          },
        })}
      >
        <ModalContentContextProvider>
          <App />
        </ModalContentContextProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
