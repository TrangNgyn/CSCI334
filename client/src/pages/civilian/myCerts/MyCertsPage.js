import { Button } from "@chakra-ui/button";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import Certificate from "./Certificate";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";

function MyCertsPage() {
  const navigate = useNavigate();
  const userStore = UserStore;

  const noCertificates = () => {
    return (
      Object.keys(userStore.vaccination_certificate).length === 0 &&
      userStore.vaccination_certificate.constructor === Object
    );
  };

  return (
    <Box h="100vh" layerStyle="grayBG">
      <Box position="absolute" h="100%" w="100%" top="40px">
        <Flex justifyContent="center" alignItems="flex-start">
          <VStack
            spacing="3"
            w="90%"
            minH="80%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            <Text variant="heading" textAlign="center">
              My Covid-19 Vaccination Certificate
            </Text>
            {noCertificates() ? (
              <>No certificates</>
            ) : (
              <Certificate content={userStore.vaccination_certificate} />
            )}
          </VStack>
        </Flex>
      </Box>
      <GrayContainer>
        <VStack spacing="7" w="90%" maxW={{ base: "90%", md: "container.sm" }}>
          <Button variant="gray" onClick={() => navigate("/civ/home")}>
            Back
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}

export default observer(MyCertsPage);
