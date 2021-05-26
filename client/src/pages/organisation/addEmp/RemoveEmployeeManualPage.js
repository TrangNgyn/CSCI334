import {
    VStack,
    Text,
    Box,
    Button,
    Input,
    InputGroup,
    Flex,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { orgMenuRoutes } from "../components/OrgRoutes";
  import LogoMenu from "../../../components/LogoMenu/LogoMenu";
  import GrayContainer from "../../../components/GrayContainer";
  import DotPattern from "../../../components/DotPattern";
  import { useNavigate } from "react-router-dom";
  import { UserStore } from "../../../stores/UserStore";
  import { observer } from "mobx-react";
  import ToastStatusMessageWrapper from '../../../components/ToastStatusMessageWrapper';
  
  const RemoveEmployeeManualPage = () => {
    const [empEmail, setEmpEmail] = useState("");
    const userStore = UserStore;
    const navigate = useNavigate();
  
    const handleRemoveEmployee = () => {
      userStore.removeEmployee(empEmail);
    };
  
    return (
      <ToastStatusMessageWrapper>
        <Box h="100vh" w="100%" layerStyle="mainBG">
          <Box position="absolute" top="5" left="5">
            <LogoMenu menuItems={orgMenuRoutes} />
          </Box>
          <DotPattern />
          <Flex
            h="60%"
            align="center"
            w="100%"
            justify="center"
            position="absolute"
            top="140px"
          >
            <Box
              bg="white"
              w="80%"
              maxW={{ base: "90%", md: "container.sm" }}
              rounded="lg"
              p="3"
              boxShadow="lg"
            >
              <InputGroup>
                <Input
                  name="userId"
                  variant="filled"
                  bg="#efefef"
                  placeholder="User Email"
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                />
              </InputGroup>
            </Box>
          </Flex>
  
          <GrayContainer>
            <VStack spacing="7" w="100%">
              <Text variant="heading" as="h2" m={0}>
                Remove Employee
              </Text>
              <VStack
                w="90%"
                maxW={{ base: "90%", md: "container.sm" }}
                spacing="5"
              >
                <Button variant="gray" onClick={() => navigate("/org/home")}>
                  BACK
                </Button>
                <Button variant="green" onClick={handleRemoveEmployee}>
                  REMOVE EMPLOYEE
                </Button>
              </VStack>
            </VStack>
          </GrayContainer>
        </Box>
      </ToastStatusMessageWrapper>
    );
  };
  
  export default observer(RemoveEmployeeManualPage);
  