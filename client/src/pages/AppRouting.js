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

  if (isLoggedIn) {
    accType === "civ" && <CivilianHome />;
    accType === "bus" && <BusinessHome />;
    accType === "org" && <OrganisationHome />;
  }
  return <Login login={handleLogin} setType={setAccType} />;
}
