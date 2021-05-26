import { Box, Center, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { orgMenuRoutes } from "../components/OrgRoutes";
import { menuOptions } from "./menuOptions";
import Option from "../../../components/Option";
import { useDisclosure } from "@chakra-ui/react";

export default function OrgHomePage() {
  const { onOpen } = useDisclosure();

  const handleNotificationClicked = () => {
    onOpen();
  };

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5" zIndex="2">
        <LogoMenu menuItems={orgMenuRoutes} notification={handleNotificationClicked}/>
      </Box>
      <Box position="absolute" w="100%" h="100%">
        <Center h="100%">
          <VStack
            spacing="3"
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
