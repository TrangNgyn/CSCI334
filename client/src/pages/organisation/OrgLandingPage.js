import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../components/LogoMenu/LogoMenu";
import { orgMenuRoutes } from "./components/OrgRoutes";
import GrayContainer from "../../components/GrayContainer";
import DotPattern from "../../components/DotPattern";
import { useNavigate } from "react-router";

export default function HealthLandingPage() {
  const navigate = useNavigate();

  return (
    <Box h="100vh" layerStyle="mainBG">
      <DotPattern />
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <LogoMenu menuItems={orgMenuRoutes} />
          <Text variant="heading" as="h2">
            Organization Account
          </Text>
          <Text align="center" w="70%">
            Track the spread. Lower the risk. Beat the plague.
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="green" onClick={() => navigate("/org/home")}>Home</Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
