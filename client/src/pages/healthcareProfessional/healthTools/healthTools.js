import { Flex, Stack, VStack, Text, Spacer, Button } from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import React from "react";
import { useNavigate } from "react-router";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";

const HealthTools = () => {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10} mx="auto">
          Health Tools
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg">
          <Text as="h2" m={0}>
            {userStore.foundUser.first_name} {userStore.foundUser.last_name}
          </Text>
          <Flex>
            <Text>User Email: </Text>
            <Spacer />
            <Text>{userStore.foundUser.email}</Text>
          </Flex>
          <Stack spacing={4}>
            <Button
              variant="green"
              onClick={() => navigate("/hea/healthtools/addvaccination")}
            >
              Add Vacination
            </Button>
            <Button
              variant="orange"
              onClick={() => navigate("/hea/healthtools/updatevaccination")}
            >
              Update Vacination
            </Button>
            <Button
              variant="red"
              onClick={() => navigate("/hea/healthtools/addcase")}
            >
              Confirm Positive Case
            </Button>
          </Stack>
        </Stack>
        <GrayContainer>
          <VStack
            spacing="7"
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            <Button
              variant="gray"
              onClick={() => navigate("/civ/home")}
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
  );
};

export default observer(HealthTools);
