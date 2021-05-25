import { useEffect, useState } from "react";
import { Box, Spacer, Text } from "@chakra-ui/layout";
import { UserStore } from "../../../stores/UserStore";
import { AccordionPanel, AccordionItem } from "@chakra-ui/react";
import AccordButton from "../components/AccordButton";
import StatItem from "../components/StatItem";

// show active cases (active being defined by new cases within the last 2 weeks)
export default function ActiveCasesStats() {
  const userStore = UserStore;
  const [groupedStats, setGroupedStats] = useState([]);

  // group active cases across NSW by area
  function groupStats() {
    let temp = [];

    for (let i = 0; i < userStore.activeCasesStats.length; i++) {
      if (temp[userStore.activeCasesStats[i].lhd_2010_name] === undefined) {
        // if key does not yet exist, define it as an empty array
        temp[userStore.activeCasesStats[i].lhd_2010_name] = [];
      }

      temp[userStore.activeCasesStats[i].lhd_2010_name].push({
        // push to array based on location, e.g. Sydney, Northern Sydney, Wollongong, etc.
        notification_date: Date(
          toString(userStore.activeCasesStats[i].notification_date) + " UTC"
        ),
        post_code: userStore.activeCasesStats[i].post_code,
      });
    }

    return temp;
  }

  useEffect(() => {
    setGroupedStats(groupStats());
  }, []);

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordButton title="Recent Cases" isExpanded={isExpanded} />

          <AccordionPanel>
            {/* display total active cases across NSW */}
            <StatItem title="NSW" value={userStore.activeCasesStats.length} />

            {/* display total active cases across NSW, grouped by area */}
            {Object.keys(groupedStats).map((keyname, i) => {
              return (
                <StatItem
                  key={i}
                  title={keyname.length === 0 ? "Unknown" : keyname}
                  value={groupedStats[keyname].length}
                />
              );
            })}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
