import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import DotPattern from "../../../components/DotPattern";
import { civMenuRoutes } from "../components/civRoutes";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { menuOptions, healthMenuOption } from "./menuOptions";
import Option from "../../../components/Option";
import { UserStore } from "../../../stores/UserStore";
import { useDisclosure } from "@chakra-ui/react";
import Notifications from "../components/Notifications";

export default function CivilianHome() {
  const navigate = useNavigate();
  const userStore = UserStore;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alerts = userStore.alerts;

  const handleNotificationClicked = () => {
    onOpen();
  };

  // fetch statistics from the DBMS afer succesful login
  useEffect(() => {
    userStore.getActiveCases();
    userStore.getAusData();
    userStore.getTotalVaccinations();
    userStore.getAusData14Days();
    userStore.getEsriData();
    userStore.getCurrentTotals();
    userStore.getRecentVicCases();
  }, []);

  return (
    <Box h="100vh" layerStyle="mainBG" position="relative" overflow="scroll">
      <Box position="fixed" zIndex="1" top="5" left="5">
        <LogoMenu
          menuItems={civMenuRoutes}
          notification={handleNotificationClicked}
        />
      </Box>
      <Box position="absolute" w="100%" top="140px" zIndex="0" pb="180px">
        <Center>
          <VStack
            spacing="2"
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            {menuOptions.map((item) => (
              <Option key={item.title} content={item} />
            ))}
            {userStore.isHealthCare && <Option content={healthMenuOption} />}
          </VStack>
        </Center>
      </Box>
      <GrayContainer>
        <VStack
          spacing="7"
          w="90%"
          maxW={{ base: "90%", md: "container.sm" }}
          zIndex="2"
        >
          <Button variant="green" onClick={() => navigate("/civ/checkin")}>
            Check In
          </Button>
        </VStack>
      </GrayContainer>
      <Notifications
        onClose={onClose}
        isOpen={isOpen}
        alerts={alerts}
      ></Notifications>
    </Box>
  );
}
