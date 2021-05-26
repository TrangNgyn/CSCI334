import React, { useState, useEffect } from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip";
import MapChart from "./HotSpotChart";
import { UserStore } from "../../../stores/UserStore";

export default function HotSpotsPage({ back }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const userStore = UserStore;
  const [groupedStats, setGroupedStats] = useState([]);
  const mobile = window.innerWidth < 800;

  // victoria data source
  const VICSource = "https://discover.data.vic.gov.au/dataset/all-victorian-sars-cov-2-cases-by-local-government-area-postcode-and-acquired-source/resource/890da9b3-0976-4de3-8028-e0c22b9a0e09";
  const NSWSource = "https://data.nsw.gov.au/data/dataset/covid-19-cases-by-location/resource/21304414-1ff1-4243-a5d2-f52778048b29";

  // group active cases across NSW/VIC by post code
  function groupStats() {
    let covidCases = [];

    // iterate over NSW covid-19 cases dataset
    for(let i = 0; i < userStore.activeCasesStats.length; i++) {

      if(covidCases[userStore.activeCasesStats[i].postcode] === undefined) { // if key does not yet exist, define it as an empty array
        covidCases[userStore.activeCasesStats[i].postcode] = 0;
      }
      
      // increment active cases for postcode 
      covidCases[userStore.activeCasesStats[i].postcode] += 1;
    }

    // iterate over VIC covid-19 cases dataset
    for(let i = 0; i < userStore.vic_recent_confirmed_cases.length; i++) {

      if(covidCases[userStore.vic_recent_confirmed_cases[i].Postcode] === undefined) { // if key does not yet exist, define it as an empty array
        covidCases[userStore.vic_recent_confirmed_cases[i].Postcode] = 0;
      }
      
      // increment active cases for postcode 
      covidCases[userStore.vic_recent_confirmed_cases[i].Postcode] += 1;
    }

    return covidCases;
  }

  useEffect(() => {
    setGroupedStats(groupStats());
  }, []);

  return (
    <Box h="100vh" layerStyle="grayBG">
      <Box position="absolute" h="100%" w="100%" top="40px">
        <VStack spacing={4} w="100%">
          <Text variant="heading" as="h2" m={0}>
            Hotspot Map
          </Text>
          <Text pb={3}>Confirmed covid-19 transmissions, last 14 days.</Text>
          // Render different map based on viewport size
          <Box width="90vw">
            {mobile ? (
              <>
                <MapChart
                  activeCases={groupedStats}
                  setTooltipContent={setContent}
                  height={800}
                />
                <ReactTooltip effect={"float"}>{content}</ReactTooltip>
              </>
            ) : (
              <>
                <MapChart
                  activeCases={groupedStats}
                  setTooltipContent={setContent}
                  height={300}
                />
                <ReactTooltip effect={"float"}>{content}</ReactTooltip>
              </>
            )}
          </Box>
        </VStack>
      </Box>

      <GrayContainer>
        <VStack w="90%" maxW={{ base: "90%", md: "container.sm" }} spacing="5">
          <Text>Source: <a href={VICSource} target="_blank">https://discover.data.vic.gov.au/</a> &nbsp;&nbsp;<a href={NSWSource} target="_blank">https://data.nsw.gov.au/</a></Text>
          <Button
            variant="gray"
            maxW="lg"
            w="90%"
            onClick={() => navigate(back)}
          >
            BACK
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
