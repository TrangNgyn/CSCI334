import { VStack, Text, Box, Button, InputGroup, Input } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { adMenuRoutes } from "../components/adRoutes";
import AccountTab from "../components/Tab";
import AccountTabPending from "../components/TabPending";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../../stores/UserStore";
import {
  useDisclosure,
} from "@chakra-ui/react";

const Organisations = () => {
  const userStore = UserStore;
  const navigate = useNavigate();

  const [verifiedOrganisations, setVerifiedOrganisations] = useState([]); // state to contain all verified organisations
  const [searchVerifiedOrganisations, setSearchVerifiedOrganisations] = useState([]); // state to contain all verified organisations when a user is using the search function

  const [unverifiedOrganisations, setUnverifiedOrganisations] = useState([]); // state to contain all unverified organisations
  const [searchUnverifiedOrganisations, setSearchUnverifiedOrganisations] = useState([]); // state to contain all unverified organisations when a user is using the search function

  const { onOpen } = useDisclosure();

  const handleNotificationClicked = () => {
    onOpen();
  };

  useEffect(() => {
    userStore.adminPopulateOrgList(setVerifiedOrganisations, setUnverifiedOrganisations);
  }, []);
  
  const handleDelete = userStore.deleteOrganisation;
  const handleVerify = userStore.verifyOrganisation;
  const handleDeny = userStore.denyOrganisation;

  const handleUserSearch = (e) => {
    if (e.target.value === "") {
      setSearchVerifiedOrganisations(verifiedOrganisations);
      setSearchUnverifiedOrganisations(unverifiedOrganisations);
    } else {
      let results = verifiedOrganisations.filter((el) => el.userId.includes(e.target.value));
      setSearchVerifiedOrganisations(results);
      results = unverifiedOrganisations.filter((el) => el.userId.includes(e.target.value));
      setSearchUnverifiedOrganisations(results);
    }
  };

  return (
    <Box h="100vh" w="100%" layerStyle="mainBG" position="relative" overflow="scroll">
      <Box position="fixed" top="5" left="5" zIndex="1">
        <LogoMenu menuItems={adMenuRoutes} notification={handleNotificationClicked} />
      </Box>
      <DotPattern position="fixed" />
      <VStack
        position="absolute"
        top="140px"
        left="0"
        right="0"
        justify="center"
        align="center"
      >
        <Box
          bg="white"
          w="80%"
          maxW={{ base: "90%", md: "container.sm" }}
          rounded="lg"
          p="4"
          boxShadow="lg"
        >
          <Text variant="heading" as="h2" align="center">
            Organisations
          </Text>
          <InputGroup>
            <Input
              name="userId"
              variant="filled"
              bg="#efefef"
              placeholder="Organisation Email"
              onChange={(e) => handleUserSearch(e)}
            />
          </InputGroup>
        </Box>
        <Tabs
          variant="soft-rounded"
          colorScheme="yellow"
          w="100%"
          align="center"
        >
          <TabList>
            <Tab border={0} mr={3} p={3}>
              Verified
            </Tab>
            <Tab border={0}>
              Pending
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0} pt={3} pb="180px">
              {verifiedOrganisations.length <= 0 ? 
                "No verified organisations to show."
              :
                <AccountTab
                  verifiedOrganisations={verifiedOrganisations}
                  handleDelete={handleDelete}
                />
              }
            </TabPanel>
            <TabPanel p={0} pt={3} pb="180px">
              {unverifiedOrganisations.length <= 0 ? 
                "No organisations awaiting verification."
              :
                <AccountTabPending
                  pendingOrganisations={unverifiedOrganisations}
                  handleVerify={handleVerify}
                  handleDeny={handleDeny}
                />
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      <GrayContainer>
        <VStack spacing="7" w="100%" position="fixed">
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => navigate("/")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default Organisations;
