import { Button } from "@chakra-ui/button";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { Accordion } from "@chakra-ui/react";
import TotalCasesStats from "./TotalCasesStats";
import ActiveCasesStats from "./ActiveCasesStats";
import TotalImmunisedStats from "./TotalImmunisedStats";
import TotalDeathsStats from "./TotalDeathsStats";
import TotalTestsStats from "./TotalTestsStats";

export default function StatsPage() {
  const navigate = useNavigate();

  return (
    <Box h="100vh" layerStyle="grayBG">
      <Box position="absolute" h="100%" w="100%" top="40px">
        <Flex justifyContent="center" direction="column" alignItems="center">
          <Text variant="heading" mb="3">
            Statistics
          </Text>
          <Box
            overflowY="scroll"
            maxW={{ base: "90%", md: "container.sm" }}
            w="100%"
            h="70vh"
            p="5"
            borderRadius="3xl"
          >
            <VStack spacing="3" w="100%">
              {/* statistics accordion */}
              <Accordion defaultIndex={null} w="100%" allowToggle>
                {/* total cases accordion item */}
                <TotalCasesStats />

                {/* active (last 14 days) cases accordion item */}
                <ActiveCasesStats />

                {/* total number of covid-19 tests performed */}
                <TotalTestsStats />

                {/* total deaths accordion item */}
                <TotalDeathsStats />

                {/* vaccination accordion item */}
                <TotalImmunisedStats />
              </Accordion>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <GrayContainer>
        <VStack spacing="7" w="90%" maxW={{ base: "90%", md: "container.sm" }}>
          <Button variant="gray" onClick={() => navigate("/civ/home")}>
            Back
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
