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
  const userStore = UserStore;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"} zIndex="0">
        <DrawerOverlay/>
        <DrawerContent bg="#EFEFEF" overflow="scroll">
          <DrawerHeader>Notifications</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
                  <Box bg="white"
                  w="90%"
                  rounded="lg"
                  p="4"
                  boxShadow="lg">
                    <VStack align="left">
                      <Text as="h3" m={0}>Under development</Text>
                    </VStack>
                  </Box>
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
