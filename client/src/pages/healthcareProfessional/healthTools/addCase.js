import {
  Flex,
  Stack,
  VStack,
  Text,
  InputGroup,
  Input,
  Button
} from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";
import ToastStatusMessageWrapper from "../../../components/ToastStatusMessageWrapper";

function AddVaccination() {
  const navigate = useNavigate();
  const userStore = UserStore;

  const handleSubmitCase = () => {
    userStore.confirmCovidCase();
  }

  useEffect(() => {
    if (userStore.operationWasSuccessful) {
      userStore.setProperty("operationWasSuccessful", false);
      navigate("/hea/healthtools");
    }
  }, [userStore.operationWasSuccessful]);

  return (
    <ToastStatusMessageWrapper>
      <Flex h="100vh" layerStyle="function">
        <Stack spacing="10" mx="auto" maxW="lg" w="90%">
          <Text as="h1" mt={10} mx="auto">
            Confirm Positive Case
          </Text>
          <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
            <Text as="h2" mt={0}>
              Confirm Positive Case of Covid-19
            </Text>
            <Text mt={0}>
              {userStore.foundUser.first_name, userStore.foundUser.last_name}
            </Text>
            <Text mt={0}>
              {userStore.foundUser.email}
            </Text>
            <InputGroup size="md">
              <Input
                name="date"
                type="date"
                placeholder={Date.now()}
                variant="filled"
                bg="#efefef"
                id="date"
              />
            </InputGroup>
            <Button
              variant="red"
              w="100%"
              onClick={() => handleSubmitCase()}
            >
              Confirm Positive Case
            </Button>
          </Stack>
          <GrayContainer>
            <VStack
              spacing="7"
              w="90%"
              maxW={{ base: "90%", md: "container.sm" }}
            >
              <Button
                variant="gray"
                onClick={() => navigate("/hea/healthtools")}
                position="fixed"
                bottom={8}
                maxW="lg"
                w="90%"
              >
                BACK
              </Button>
            </VStack>
          </GrayContainer>
        </Stack>
      </Flex>
    </ToastStatusMessageWrapper>
  );
}

export default observer(AddVaccination);
