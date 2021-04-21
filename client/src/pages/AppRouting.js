import React, { useState } from "react";
import Login from "./login/Login";
import BusinessHome from "./business/BusinessHome";
import CivilianHome from "./civilian/CivilianHome";
import OrganisationHome from "./organisation/OrganisationHome";

export default function AppRouting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accType, setAccType] = useState("civ");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    if (accType === "civ") {
      return <CivilianHome handleLogout={handleLogout} />;
    }
    if (accType === "bus") {
      return <BusinessHome handleLogout={handleLogout} />;
    }
    if (accType === "org") {
      return <OrganisationHome handleLogout={handleLogout} />;
    }
  }
  return <Login login={handleLogin} setAccType={setAccType} />;
}
