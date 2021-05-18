import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../components/LogoMenu/LogoMenu";
import { civMenuRoutes } from "./components/civRoutes";
import GrayContainer from "../../components/GrayContainer";
import DotPattern from "../../components/DotPattern";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box h="100vh" layerStyle="mainBG">
      <DotPattern />
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <LogoMenu menuItems={civMenuRoutes} />
          <Text variant="heading" as="h2">
            User Account
          </Text>
          <Text align="center" w="70%">
            Track the spread. Lower the risk. Beat the plague.
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => navigate("/civ/home")}>
              Home
            </Button>
            <Button variant="green" onClick={() => navigate("/civ/checkin")}>
              Check In
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
