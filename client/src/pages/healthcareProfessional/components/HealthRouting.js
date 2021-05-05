import React from "react";
import { Routes, Route } from "react-router-dom";
import { healthRoutes } from "../components/HealthRoutes";

export default function HealthRouting() {
  return (
    <Routes>
      {healthRoutes.map((route) => (
        <Route
          key={route.component}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
}
