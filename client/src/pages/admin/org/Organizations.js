import { VStack, Container, Text, Box, Button, InputGroup, Input } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import { adMenuRoutes } from "../components/adRoutes";
import AccountTab from "../components/Tab";
import AccountTabPending from "../components/TabPending";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";

// TO-DO: replace orgs and orgsPending by verified organizations,
//and organisations that are seek verification
const orgs = [
  {
    name: "UoW",
    userId: "123141",
  },
  {
    name: "UNSW",
    userId: "121323",
  },
  {
    name: "UTS",
    userId: "121231",
  },
  {
    name: "UoW",
    userId: "123141",
  },
  {
    name: "UNSW",
    userId: "121323",
  },
  {
    name: "UTS",
    userId: "121231",
  },
];
const orgsPending = [
  {
    name: "UCal",
    userId: "233214",
  },
  {
    name: "USyd",
    userId: "234324",
  },
  {
    name: "UCLA",
    userId: "253212",
  },
];

const FindUserPage = () => {
  const navigate = useNavigate();
  const [organisations, setOrganisations] = useState(orgs);
  const [organisationsPending, setOrganisationsPending] = useState(orgsPending);

  const handleDelete = (organisation) => {
    organisations.splice(organisations.indexOf(organisation), 1);
    setOrganisations(organisations);
    //   TO-DO: Update database
  };

  const handleVerify = (organisation) => {
    organisationsPending.splice(organisationsPending.indexOf(organisation), 1);
    setOrganisationsPending(organisationsPending);
    organisations.push(organisation);
    setOrganisations(organisations);
    //   TO-DO: Update database
  };

  const handleUserSearch = (e) => {
    if (e.target.value === "") {
      setOrganisations(orgs);
      setOrganisationsPending(orgsPending);
    } else {
      let results = orgs.filter((el) => el.userId.includes(e.target.value));
      setOrganisations(results);
      results = orgsPending.filter((el) => el.userId.includes(e.target.value));
      setOrganisationsPending(results);
    }
  };

  return (
    <Box h="100vh" w="100%" layerStyle="mainBG" position="relative" overflow="scroll">
      <Box position="fixed" top="5" left="5">
        <LogoMenu menuItems={adMenuRoutes} />
      </Box>
      <DotPattern position="fixed"/>
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
              placeholder="User ID"
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
              <AccountTab
                civilians={organisations}
                handleDelete={handleDelete}
              />
            </TabPanel>
            <TabPanel p={0} pt={3} pb="180px">
                {organisationsPending.length <= 0 ? "Empty":<AccountTabPending
                civilians={organisationsPending}
                handleVerify={handleVerify}
              />}
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
            <Button variant="gray" onClick={() => navigate("/ad/home")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default FindUserPage;
