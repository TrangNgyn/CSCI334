import React from "react";
import { Routes, Route } from "react-router-dom";
import { busRoutes } from "../components/BusRoutes";

export default function BusRouting() {
  return (
    <Routes>
      {busRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
