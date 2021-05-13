import { Button } from "@chakra-ui/button";
import { Box, Center, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { orgMenuRoutes } from "../components/OrgRoutes";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { menuOptions } from "./menuOptions";
import Option from "../../civilian/home/Option";

export default function CivilianHome() {
  const navigate = useNavigate();

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={orgMenuRoutes} />
      </Box>
      <Box position="absolute" w="100%" top="140px">
        <Center>
          <VStack
            spacing="3"
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            {menuOptions.map((item) => (
              <Option content={item} />
            ))}
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
