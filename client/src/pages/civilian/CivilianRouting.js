import React from "react";
import { Switch, Route } from "react-router-dom";
import { civRoutes } from "../pageRoutes/CivRoutes";

export default function CivilianRouting() {
  return (
    <Switch>
      {civRoutes.map((route) => (
        <Route key={route.component} {...route} />
      ))}
    </Switch>
  );
}
