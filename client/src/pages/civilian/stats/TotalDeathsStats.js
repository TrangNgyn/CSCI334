import { UserStore } from "../../../stores/UserStore";
import { AccordionPanel, AccordionItem } from "@chakra-ui/react";
import AccordButton from "../components/AccordButton";
import StatItem from "../components/StatItem";

export default function TotalDeathsStats() {
  const userStore = UserStore;

  const currentDeaths = [
    {
      key: "Total Deaths",
      value: userStore.esri_current_totals[0].Total_Deaths.toLocaleString(),
    },
    {
      key: "NSW",
      value: userStore.esri_current_totals[0].NSW_Deaths.toLocaleString(),
    },
    {
      key: "VIC",
      value: userStore.esri_current_totals[0].VIC_Deaths.toLocaleString(),
    },
    {
      key: "ACT",
      value: userStore.esri_current_totals[0].ACT_Deaths.toLocaleString(),
    },
    { key: "NT", value: 0 },
    {
      key: "QLD",
      value: userStore.esri_current_totals[0].QLD_Deaths.toLocaleString(),
    },
    {
      key: "SA",
      value: userStore.esri_current_totals[0].SA_Deaths.toLocaleString(),
    },
    {
      key: "TAS",
      value: userStore.esri_current_totals[0].TAS_Deaths.toLocaleString(),
    },
  ];

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordButton title="Total Deaths" isExpanded={isExpanded} />

          <AccordionPanel>
            {/* display total active cases across NSW, grouped by area */}
            {currentDeaths.map((total, i) => {
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
