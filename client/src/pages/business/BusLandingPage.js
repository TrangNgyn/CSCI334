import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../components/LogoMenu/LogoMenu";
import { busMenuRoutes } from "./components/BusRoutes";
import GrayContainer from "../../components/GrayContainer";
import DotPattern from "../../components/DotPattern";
import { useNavigate } from "react-router";
import { useDisclosure } from "@chakra-ui/react";

export default function HealthLandingPage() {
  const navigate = useNavigate();
  const { onOpen } = useDisclosure();

  const handleNotificationClicked = () => {
    onOpen();
  };

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5" zIndex="2"></Box>
      <DotPattern />
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <LogoMenu
            menuItems={busMenuRoutes}
            notification={handleNotificationClicked}
          />
          <Text variant="heading" as="h2">
            Business Account
          </Text>
          <Text align="center" w="70%">
            Track the spread. Lower the risk. Beat the plague.
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="green" onClick={() => navigate("/bus/checkin")}>
              My QR Code
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
