import { Select, Center, Text, Stack, VStack, Box } from "@chakra-ui/react";
import React from "react";
import QRScan from "./QRScan";
import GrayContainer from "../../../components/GrayContainer";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import AddDependantsPage from "./AddDependantsPage";
import CheckInSuccess from "./CheckInSuccess";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";
import ToastStatusMessageWrapper from "../../../components/ToastStatusMessageWrapper";

function CheckInPage({ back }) {
  const userStore = UserStore;
  const navigate = useNavigate();

  if (!userStore.scanned) {
    return (
      <ToastStatusMessageWrapper>
        <Box h="100vh">
          <Stack w="100%" position="absolute">
            <Stack spacing={7} bg="gray.100">
              <Center>
                <Text variant="heading" mb={0}>
                  Safe Check In
                </Text>
              </Center>
              <div id="sourceSelectPanel">
                <Select
                  w="90%"
                  maxW={{ base: "90%", md: "container.sm" }}
                  id="sourceSelect"
                  bg="white"
                  placeholder="Camera options"
                  mb={7}
                  mx="auto"
                ></Select>
              </div>
            </Stack>
            <Center>
              <QRScan />
            </Center>
          </Stack>
          <GrayContainer>
            <VStack
              w="90%"
              maxW={{ base: "90%", md: "container.sm" }}
              spacing="5"
            >
              <Button variant="gray" id="back" onClick={() => navigate(back)}>
                Back
              </Button>
            </VStack>
          </GrayContainer>
        </Box>
      </ToastStatusMessageWrapper>
    );
  }
  if (!userStore.checkedIn) {
    return <AddDependantsPage setProperty={userStore.setProperty} />;
  }
  return <CheckInSuccess userStore={userStore} />;
}

export default observer(CheckInPage);
