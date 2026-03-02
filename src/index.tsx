import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import GithubCorner from "./page/GithubCorner";
import reportWebVitals from "./reportWebVitals";
import Mount from "./Mount";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App: FC = () => {
  return (
    <>
      <Mount />
      <GithubCorner href="https://github.com/cgfeel/formily" />
    </>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
