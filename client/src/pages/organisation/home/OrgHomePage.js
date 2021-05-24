import { Box, Center, VStack } from "@chakra-ui/layout";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import { orgMenuRoutes } from "../components/OrgRoutes";
import { menuOptions } from "./menuOptions";
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
  Button,
} from "@chakra-ui/react";

export default function OrgHomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userStore = UserStore;
  const alerts = userStore.alerts;

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
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"} zIndex="0">
        <DrawerOverlay/>
        <DrawerContent bg="#EFEFEF" overflow="scroll">
          <DrawerHeader>Notifications</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
              {
                alerts.map((el) => (
                  <Box bg="white"
                  w="90%"
                  rounded="lg"
                  p="4"
                  boxShadow="lg">
                    <VStack align="left">
                      <Text as="h3" m={0}>COVID-19 Alert</Text>
                      <Text>Location: {el.location}</Text>
                      <Text>Date: {el.date}</Text>
                      <Text>Time: {el.timeStart} - {el.timeFinish}</Text>
                    </VStack>
                  </Box>
                ))
              }
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" spacing={4}>
              <Button variant="gray" onClick={onClose}>
                Back
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
