import {
    Stack,
    VStack,
    Text,
    Box,
    Button,
    Input,
    InputGroup,
  } from "@chakra-ui/react";
  import React from "react";
import { orgMenuRoutes } from "../components/OrgRoutes";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";

const AddEmployeeManually = ({ back }) => {
    const navigate = useNavigate();
  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={orgMenuRoutes} />
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
              placeholder="Employee Trace Response ID"
              id="employeeId"
            ></Input>
          </InputGroup>
        </Stack>
      </Stack>

      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Text variant="heading" as="h2" m={0}>
            Add Employee
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={back}>
              BACK
            </Button>
            <Button
              variant="green"
              // TO-DO: Add to the database
              onClick={() => navigate("/org/home")}
            >
              Search
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default AddEmployeeManually;