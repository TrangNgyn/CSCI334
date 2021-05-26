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
import { observer } from "mobx-react";
import ToastStatusMessageWrapper from "../../../components/ToastStatusMessageWrapper";

const Organisations = () => {
  const userStore = UserStore;
  const navigate = useNavigate();

  const [updateOrgList, setUpdateOrgList] = useState(false);

  const [verifiedOrganisations, setVerifiedOrganisations] = useState([]); // state to contain all verified organisations
  const [searchVerifiedOrganisations, setSearchVerifiedOrganisations] = useState([]); // state to contain all verified organisations when a user is using the search function

  const [unverifiedOrganisations, setUnverifiedOrganisations] = useState([]); // state to contain all unverified organisations
  const [searchUnverifiedOrganisations, setSearchUnverifiedOrganisations] = useState([]); // state to contain all unverified organisations when a user is using the search function

  const { onOpen } = useDisclosure();

  const handleNotificationClicked = () => {
    onOpen();
  };

  // load organisations from DB on component mount
  useEffect(() => {
    userStore.adminPopulateOrgList(setVerifiedOrganisations, setUnverifiedOrganisations);
  }, []);

  // load organisations from DB on status update
  useEffect(() => {
    if(updateOrgList) {
      userStore.adminPopulateOrgList(setVerifiedOrganisations, setUnverifiedOrganisations);
      setUpdateOrgList(false);
    }
  }, [updateOrgList]);

  // if organisations retrieved successfully, set the search states for searching functionality
  useEffect(() => {
    if(userStore.operationWasSuccessful) {
      setSearchVerifiedOrganisations(verifiedOrganisations);
      setSearchUnverifiedOrganisations(unverifiedOrganisations);
      userStore.setProperty("operationWasSuccessful", false);
    }
  }, [userStore.operationWasSuccessful]);
  
  const handleOrganisationVerification = userStore.updateOrganisationVerification; // function to update an organisations account status (verified = true || verified = false)

  // function to enable searching of organisation accounts in list (caps sensitive)
  const handleUserSearch = (e) => {
    if (e.target.value === "") { // if there is nothing in the input/search bar the searchable states are === to the original states
      setSearchVerifiedOrganisations(verifiedOrganisations); 
      setSearchUnverifiedOrganisations(unverifiedOrganisations);
    } else { // else if the searchable states contain what's in the input.search bar update them
      let results = verifiedOrganisations.filter((el) => el.email.includes(e.target.value));
      setSearchVerifiedOrganisations(results);
      results = unverifiedOrganisations.filter((el) => el.email.includes(e.target.value));
      setSearchUnverifiedOrganisations(results);
    }
  };

  return (
    <ToastStatusMessageWrapper>
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
            defaultIndex={0}
          >
            <TabList>
              <Tab cursor="pointer" border={0} mr={3} p={3}>
                Verified
              </Tab>
              <Tab cursor="pointer" border={0}>
                Pending
              </Tab>
            </TabList>
            <Box
              overflowY="scroll"
              maxW={{ base: "90%", md: "container.md" }}
              w="100%"
              h="30vh"
              borderRadius="3xl"
              mt={5}
            >
            <TabPanels>
              <TabPanel p={0} pb="180px">
                {searchVerifiedOrganisations.length <= 0 ? 
                  "No verified organisations to show."
                :
                  <AccountTab
                    verifiedOrganisations={searchVerifiedOrganisations}
                    handleOrganisationVerification={handleOrganisationVerification}
                    setUpdateOrgList={setUpdateOrgList}
                  />
                }
              </TabPanel>
              <TabPanel p={0} pb="180px">
                {searchUnverifiedOrganisations.length <= 0 ? 
                  "No organisations awaiting verification."
                :
                  <AccountTabPending
                    pendingOrganisations={searchUnverifiedOrganisations}
                    handleOrganisationVerification={handleOrganisationVerification}
                    setUpdateOrgList={setUpdateOrgList}
                  />
                }
              </TabPanel>
            </TabPanels>
          </Box>
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
    </ToastStatusMessageWrapper>
  );
};

export default observer(Organisations);
