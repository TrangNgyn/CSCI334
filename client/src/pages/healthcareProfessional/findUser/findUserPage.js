import {
  VStack,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { civMenuRoutes } from "../../civilian/components/civRoutes";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";
import ToastStatusMessageWrapper from "../../../components/ToastStatusMessageWrapper";

const FindUserPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const userStore = UserStore;
  const navigate = useNavigate();

  const handleFindUser = () => {
    userStore.healthCareSearchUser(userEmail);
  };

  useEffect(() => {
    if(userStore.operationWasSuccessful) {
      userStore.setProperty('operationWasSuccessful', false);
      navigate("/hea/healthtools");
    }
  }, [userStore.operationWasSuccessful]);

  return (
    <ToastStatusMessageWrapper>
      <Box h="100vh" w="100%" layerStyle="mainBG">
        <Box position="absolute" top="5" left="5">
          <LogoMenu menuItems={civMenuRoutes} />
        </Box>
        <DotPattern />
        <Flex
          h="60%"
          align="center"
          w="100%"
          justify="center"
          position="absolute"
        >
          <Box
            bg="white"
            w="80%"
            maxW={{ base: "90%", md: "container.sm" }}
            rounded="lg"
            p="3"
            boxShadow="lg"
          >
            <InputGroup>
              <Input
                name="userEmail"
                variant="filled"
                bg="#efefef"
                placeholder="User Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </InputGroup>
          </Box>
        </Flex>

        <GrayContainer>
          <VStack spacing="7" w="100%">
            <Text variant="heading" as="h2" m={0}>
              Find User
            </Text>
            <VStack
              w="90%"
              maxW={{ base: "90%", md: "container.sm" }}
              spacing="5"
            >
              <Button variant="gray" onClick={() => navigate("/civ/home")}>
                BACK
              </Button>
              <Button variant="green" onClick={() => handleFindUser()}>
                Search
              </Button>
            </VStack>
          </VStack>
        </GrayContainer>
      </Box>
    </ToastStatusMessageWrapper>
  );
};

export default observer(FindUserPage);
