import React, { useState } from "react";
import Login from "./login/Login";
import BusinessHome from "./business/BusinessHome";
import CivilianHome from "./civilian/home/CivilianHome";
import OrganisationHome from "./organisation/OrganisationHome";
import HealthcareProfessionalHome from "./healthcareProfessional/healthcareProfessionalHome";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react";

function AppRouting() {
  const userStore = UserStore;

  const handleLogout = () => {
    userStore.doLogout();
  };

  if (userStore.isLoggedIn) {
    if (userStore.accType === "civ") {
      return <CivilianHome handleLogout={handleLogout} />;
    }
    if (userStore.accType === "bus") {
      return <BusinessHome handleLogout={handleLogout} />;
    }
    if (userStore.accType === "org") {
      return <OrganisationHome handleLogout={handleLogout} />;
    }
    if (userStore.accType === "hea") {
      return <HealthcareProfessionalHome handleLogout={handleLogout} />;
    }
  }

  return <Login userStore={userStore} />;
}

export default observer(AppRouting);
