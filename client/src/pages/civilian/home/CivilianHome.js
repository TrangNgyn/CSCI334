import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { civMenuRoutes } from "../components/civRoutes";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { menuOptions, healthMenuOption } from "./menuOptions";
import Option from "./Option";
import { UserStore } from "../../../stores/UserStore";

export default function CivilianHome() {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={civMenuRoutes} />
      </Box>
      <Box position="absolute" w="100%" top="140px">
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
        <VStack spacing="7" w="90%" maxW={{ base: "90%", md: "container.sm" }}>
          <Button variant="green" onClick={() => navigate("/civ/checkin")}>
            Check In
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
