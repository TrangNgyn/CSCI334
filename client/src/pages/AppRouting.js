import React from "react";
import BusRouting from "./business/components/BusRouting";
import CivilianRouting from "./civilian/components/CivilianRouting";
import OrgRouting from "./organisation/components/OrgRouting";
import AdRouting from "./admin/components/AdRouting";
import { observer } from "mobx-react";
//import { useNavigate } from "react-router";

function AppRouting({ userStore }) {
  //const navigate = useNavigate();
  //navigate("../");
  if (userStore.roles[0] === "ROLE_CIVILIAN") {
    return <CivilianRouting />;
  }
  if (userStore.roles[0] === "ROLE_BUSINESS") {
    return <BusRouting />;
  }
  if (userStore.roles[0] === "ROLE_ORGANISATION") {
    return <OrgRouting />;
  }
  if (userStore.roles[0] === "ROLE_ADMIN") {
    return <AdRouting />;
  }

  // Plan type not found
  userStore.doLogout();
}

export default observer(AppRouting);
