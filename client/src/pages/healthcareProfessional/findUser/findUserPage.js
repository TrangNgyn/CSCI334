import {
  Flex,
  Stack,
  VStack,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { healthMenuRoutes } from "../components/HealthRoutes";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";

import { useNavigate } from "react-router-dom";

const FindUserPage = ({ handleFindingUser }) => {
  const navigate = useNavigate();
  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={healthMenuRoutes} />
      </Box>
      <DotPattern></DotPattern>
      <Stack
        spacing={10}
        mx="auto"
        maxW="lg"
        w="90%"
        position="absolute"
        top="140px"
        left={0}
        right={0}
      >
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
          <InputGroup>
            <Input
              name="email"
              variant="filled"
              bg="#efefef"
              placeholder="Email"
              id="email"
            ></Input>
          </InputGroup>
          <InputGroup>
            <Input
              name="userID"
              variant="filled"
              bg="#efefef"
              placeholder="User ID"
              id="userID"
            ></Input>
          </InputGroup>
        </Stack>
      </Stack>

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
            <Button variant="gray" onClick={() => navigate("/hea/home")}>
              BACK
            </Button>
            <Button
              variant="green"
              onClick={() => navigate("/hea/healthtools")}
            >
              Search
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default FindUserPage;
