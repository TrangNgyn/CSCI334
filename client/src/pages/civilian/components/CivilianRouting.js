import React from "react";
import { Routes, Route } from "react-router-dom";
import { civRoutes } from "../components/civRoutes";

export default function CivilianRouting() {
  return (
    <Routes>
      {civRoutes.map((route, x) => (
        <Route key={x} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
