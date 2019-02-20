import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chess from "./chess/chess";



const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Chess} />
    </Switch>
  </BrowserRouter>
);
export default Router;