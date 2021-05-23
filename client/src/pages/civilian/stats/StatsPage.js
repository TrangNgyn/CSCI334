import { Button } from "@chakra-ui/button";
import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { Accordion } from "@chakra-ui/react"
import ActiveCasesStats from './ActiveCasesStats';
import TotalImmunisedStats from './TotalImmunisedStats'

export default function StatsPage() {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="grayBG">
      <Box position="absolute" h="100%" w="100%" top="40px">
        <Flex justifyContent="center" alignItems="flex-start">
          <VStack
            spacing="3"
            w="90%"
            minH="80%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            <Text variant="heading" mb="3">
              Statistics
            </Text>
            
            {/* statistics accordion */}
            <Accordion defaultIndex={[0]} allowMultiple>

              {/* active cases accordion item */}
              <ActiveCasesStats />
              
              {/* vaccination accordion item */}
              <TotalImmunisedStats />


            </Accordion>

          </VStack>
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
