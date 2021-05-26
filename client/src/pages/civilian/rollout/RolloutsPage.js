import React, { useEffect, useState } from "react";
import { Button, Select, Box, Text, VStack, Link } from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import VacCentres from "../components/VacCentres";
import RolloutInfo from "../components/RolloutInfo";
import { Accordion, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import AccordButton from "../components/AccordButton";

function RolloutsPage({ back }) {
  const navigate = useNavigate();
  const userStore = UserStore;
  const [rolloutPanel, setRolloutPanel] = useState(0);

  useEffect(() => {
    userStore.getVaccineLocations();
  }, []);

  return (
    <Box h="100vh" layerStyle="mainBG">
      <GrayContainer>
        <VStack spacing={4} w="100%">
          <Text variant="heading" m={0}>
            Rollout Info
          </Text>

          <Accordion defaultIndex={[0]} w="90%" maxW="container.sm" allowToggle>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordButton
                    title="Rollout Phases"
                    isExpanded={isExpanded}
                  />
                  <AccordionPanel mb={4} bg="#fafafa" borderRadius="2xl">
                    <Box
                      w="90%"
                      maxW="container.sm"
                      p="5"
                      overflow="auto"
                      h="36vh"
                      maxH="36vh"
                    >
                      <Select
                        bg="white"
                        shadow="base"
                        border="none"
                        mb="4"
                        placeholder="Select rollout phase"
                        onChange={(e) => setRolloutPanel(e.target.value)}
                      >
                        <option value="0">Phase 1a</option>
                        <option value="1">Phase 1b</option>
                        <option value="2">Phase 2a</option>
                        <option value="3">Phase 2b</option>
                        <option value="4">Phase 3</option>
                      </Select>
                      <RolloutInfo rolloutPanel={rolloutPanel} />
                      <Link
                        href="https://covid-vaccine.healthdirect.gov.au/eligibility"
                        isExternal
                      >
                        <Text variant="link">Find out if your eligible</Text>
                      </Link>
                    </Box>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordButton
                    title="Vaccination Centres"
                    isExpanded={isExpanded}
                  />

                  <AccordionPanel pb={4}>
                    <VacCentres userStore={userStore} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>

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

export default observer(RolloutsPage);
