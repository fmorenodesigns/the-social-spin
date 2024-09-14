import "./styles.scss";

import React from "react";

import Page from "../Page";

import Routes from "./Routes";

export default function App() {
  return (
    <Routes
      routes={[
        {
          path: "/",
          element: <Page />,
        },
        // { path: ".*", element: <PageNotFound /> },
      ]}
    />
  );
}
