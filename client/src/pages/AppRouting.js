import React from "react";
import BusRouting from "./business/components/BusRouting";
import CivilianRouting from "./civilian/components/CivilianRouting";
import OrgRouting from "./organisation/components/OrgRouting";
import AdRouting from "./admin/components/AdRouting";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";

function AppRouting({ userStore }) {
  useNavigate("/");
  if (userStore.accType === "civilian") {
    return <CivilianRouting />;
  }
  if (userStore.accType === "business") {
    return <BusRouting />;
  }
  if (userStore.accType === "organisation") {
    return <OrgRouting />;
  }
  if (userStore.accType === "admin") {
    return <AdRouting />;
  }

  // Plan type not found
  userStore.doLogout();
}

export default observer(AppRouting);
