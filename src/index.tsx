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
            MuiTextField: {
              styleOverrides: {
                root: {
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid #D9D9D9",
                      borderRadius: "4px",
                      transition: ".5s all",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "2px solid #BA9CF8",
                      borderRadius: "4px",
                    },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    transition: ".5s all",
                  },
                  marginRight: "1.667vw",
                  cursor: "pointer",
                  transition: ".5s all",
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
