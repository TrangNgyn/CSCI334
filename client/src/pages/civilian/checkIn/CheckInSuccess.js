import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { useNavigate } from "react-router";
import GrayContainer from "../../../components/GrayContainer";
import { RiCheckboxCircleFill } from "react-icons/ri";
import Icon from "@chakra-ui/icon";

export default function CheckInSuccess({ userStore }) {
  const navigate = useNavigate();

  const checkOut = () => {
    userStore.setProperty("scanned", false);
    userStore.setProperty("checkedIn", false);
  };

  return (
    <Box h="100vh" layerStyle="foodBG">
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Icon as={RiCheckboxCircleFill} color="#2FE562" boxSize={36} />
          <Text variant="heading" as="h2">
            Check In Successful!
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => navigate("/civ/home")}>
              Home
            </Button>
            <Button variant="red" onClick={() => checkOut()}>
              Check Out
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
