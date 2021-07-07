import React from "react";
import BusRouting from "./business/components/BusRouting";
import CivilianRouting from "./civilian/components/CivilianRouting";
import OrgRouting from "./organisation/components/OrgRouting";
import AdRouting from "./admin/components/AdRouting";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react";

function AppRouting() {
  const userStore = UserStore;

  if (
    (userStore.roles[0] === "ROLE_CIVILIAN" ||
      userStore.roles[0] === "ROLE_HEALTHCARE") &&
    userStore.isLoggedIn === true
  ) {
    return <CivilianRouting />;
  }
  if (
    userStore.roles[0] === "ROLE_BUSINESS" &&
    userStore.isLoggedIn === true
  ) {
    return <BusRouting />;
  }
  if (
    userStore.roles[0] === "ROLE_ORGANISATION" &&
    userStore.isLoggedIn === true  
  ) {
    return <OrgRouting />;
  }
  if (
    userStore.roles[0] === "ROLE_ADMIN" &&
    userStore.isLoggedIn === true
  ) {
    return <AdRouting />;
  }

  // Plan type not found
  userStore.doLogout();
}

export default observer(AppRouting);
