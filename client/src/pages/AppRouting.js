import React from "react";
import BusRouting from "./business/components/BusRouting";
import CivilianRouting from "./civilian/components/CivilianRouting";
import OrgRouting from "./organisation/components/OrgRouting";
import HealthRouting from "./healthcareProfessional/components/HealthRouting";
import { observer } from "mobx-react";

function AppRouting({ userStore }) {
  if (userStore.accType === "civ") {
    return <CivilianRouting />;
  }
  if (userStore.accType === "hea") {
    return <HealthRouting />;
  }
  if (userStore.accType === "bus") {
    return <BusRouting />;
  }
  if (userStore.accType === "org") {
    return <OrgRouting />;
  }

  // Plan type not found
  userStore.doLogout();
}

export default observer(AppRouting);
