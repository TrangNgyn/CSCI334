import { Flex, Center, Text, Spacer, VStack, Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import QRScan from "./QRScan";
import GrayContainer from "../../../components/GrayContainer";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import AddDependantsPage from "./AddDependantsPage";
import CheckInSuccess from "./CheckInSuccess";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";

function CheckInPage() {
  const userStore = UserStore;
  const navigate = useNavigate();

  if (!userStore.scanned) {
    return (
      <Box h="100vh">
        <Center w="100%" position="absolute" bg="gray.100">
          <Text variant="heading">Safe Check In</Text>
          <Button
            borderRadius="full"
            variant="green"
            w="20"
            ml="5"
            onClick={() => userStore.setProperty("scanned", true)}
          >
            scan
          </Button>
        </Center>
        <QRScan />
        <GrayContainer>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => navigate("/civ/home")}>
              Back
            </Button>
          </VStack>
        </GrayContainer>
      </Box>
    );
  }
  if (!userStore.checkedIn) {
    return <AddDependantsPage setProperty={userStore.setProperty} />;
  }
  return <CheckInSuccess userStore={userStore} />;
}

export default observer(CheckInPage);
