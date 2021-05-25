import { UserStore } from "../../../stores/UserStore";
import { AccordionPanel, AccordionItem } from "@chakra-ui/react";
import AccordButton from "../components/AccordButton";
import StatItem from "../components/StatItem";

export default function TotalCasesStats() {
  const userStore = UserStore;

  const currentTotals = [
    {
      key: "Total Cases",
      value: userStore.esri_current_totals[0].Total_Cases.toLocaleString(),
    },
    {
      key: "NSW",
      value: userStore.esri_current_totals[0].NSW.toLocaleString(),
    },
    {
      key: "VIC",
      value: userStore.esri_current_totals[0].VIC.toLocaleString(),
    },
    {
      key: "ACT",
      value: userStore.esri_current_totals[0].ACT.toLocaleString(),
    },
    { key: "NT", value: userStore.esri_current_totals[0].NT.toLocaleString() },
    {
      key: "QLD",
      value: userStore.esri_current_totals[0].QLD.toLocaleString(),
    },
    { key: "SA", value: userStore.esri_current_totals[0].SA.toLocaleString() },
    {
      key: "TAS",
      value: userStore.esri_current_totals[0].TAS.toLocaleString(),
    },
  ];

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordButton title="Total Cases" isExpanded={isExpanded} />

          <AccordionPanel>
            {/* display total active cases across NSW, grouped by area */}
            {currentTotals.map((total, i) => {
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
