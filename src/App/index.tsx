import "./styles.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Page from "../Page";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Page />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
