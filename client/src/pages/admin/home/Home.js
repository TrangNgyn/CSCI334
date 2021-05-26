import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { adMenuRoutes } from "../components/adRoutes";
import { useNavigate } from "react-router";
import menuOptions from "./menuOptions";
import Option from "../../../components/Option";
import { UserStore } from "../../../stores/UserStore";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

export default function AdminHome() {
  //const userStore = UserStore;
  const { onOpen } = useDisclosure();

  const handleNotificationClicked = () => {
    onOpen();
  };

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={adMenuRoutes} notification={handleNotificationClicked}/>
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
