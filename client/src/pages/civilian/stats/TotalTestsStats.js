import React from "react";
import { UserStore } from "../../../stores/UserStore";
import { AccordionPanel, AccordionItem } from "@chakra-ui/react";
import AccordButton from "../components/AccordButton";
import StatItem from "../components/StatItem";

// show active cases (active being defined by new cases within the last 2 weeks)
export default function TotalImmunisedStats() {
  const userStore = UserStore;

  const currentVaccinations = [
    {
      key: "Total",
      value: (
        userStore.esri_current_totals[0].NSW_Tests +
        userStore.esri_current_totals[0].VIC_Tests +
        userStore.esri_current_totals[0].ACT_Tests +
        userStore.esri_current_totals[0].NT_Tests +
        userStore.esri_current_totals[0].QLD_Tests +
        userStore.esri_current_totals[0].SA_Tests +
        userStore.esri_current_totals[0].TAS_Tests
      ).toLocaleString(),
    },
    {
      key: "NSW",
      value: userStore.esri_current_totals[0].NSW_Tests.toLocaleString(),
    },
    {
      key: "VIC",
      value: userStore.esri_current_totals[0].VIC_Tests.toLocaleString(),
    },
    {
      key: "ACT",
      value: userStore.esri_current_totals[0].ACT_Tests.toLocaleString(),
    },
    {
      key: "NT",
      value: userStore.esri_current_totals[0].NT_Tests.toLocaleString(),
    },
    {
      key: "QLD",
      value: userStore.esri_current_totals[0].QLD_Tests.toLocaleString(),
    },
    {
      key: "SA",
      value: userStore.esri_current_totals[0].SA_Tests.toLocaleString(),
    },
    {
      key: "TAS",
      value: userStore.esri_current_totals[0].TAS_Tests.toLocaleString(),
    },
  ];

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordButton title="Tests Performed" isExpanded={isExpanded} />

          <AccordionPanel>
            {/* display total active cases across NSW, grouped by area */}
            {currentVaccinations.map((total, i) => {
              return (
                <StatItem key={i} title={total["key"]} value={total["value"]} />
              );
            })}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
