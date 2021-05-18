import { VStack, Text, Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../../stores/UserStore";
import QRImage from "../../../components/QRImage";

const CheckinPage = () => {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="mainBG">
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Text variant="heading" as="h2" m={0}>
            Momo kitchen
          </Text>
          <Text align="center" w="70%">
            Check in to our premises
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <QRImage src={userStore.QRCodeUrl} />
            <Button variant="gray" onClick={() => navigate("/")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default CheckinPage;
