import React from "react";
import { Routes, Route } from "react-router-dom";
import { adRoutes } from "./adRoutes";

export default function CivilianRouting() {
  return (
    <Routes>
      {adRoutes.map((route, x) => (
        <Route key={x} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
