import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import GrayContainer from "../../../components/GrayContainer";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";

function AcceptDependants({ setProperty, showDeps }) {
  const userStore = UserStore;

  useEffect(() => {
    userStore.getBusiness();
  }, []);

  return (
    <Box h="100vh" layerStyle="foodBG">
      <GrayContainer>
        <VStack spacing="3" w="100%">
            <Text variant="heading" as="h2">
              {userStore.business_name}
            </Text>
            <Text fontSize="2xl">
              {userStore.address}
            </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => showDeps(true)}>
              Add Dependants
            </Button>
            <Button
              variant="green"
              onClick={() => setProperty("checkedIn", true)}
            >
              Check In
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
}

export default observer(AcceptDependants);
