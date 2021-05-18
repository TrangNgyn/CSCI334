import { VStack, Text, Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../../stores/UserStore";
import QRImage from "../../../components/QRImage";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="mainBG">
      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Text variant="heading" as="h2" m={0}>
            Health Org
          </Text>
          <Text align="center" w="70%">
            Have a healthcare worker join the organisation by scanning this QR
            code
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <QRImage src={userStore.QRCodeUrl} />
            <Text variant="link" onClick={() => navigate("/org/addempmanual")}>
              Or manually add employee by ID here
            </Text>
            <Button variant="gray" onClick={() => navigate("/org/home")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default AddEmployeePage;
