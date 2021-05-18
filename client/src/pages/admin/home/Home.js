import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { adMenuRoutes } from "../components/adRoutes";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import menuOptions from "./menuOptions";
import Option from "../../../components/Option";
import { UserStore } from "../../../stores/UserStore";

export default function CivilianHome() {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={adMenuRoutes} />
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
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
