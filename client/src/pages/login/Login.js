import {
  Center,
  Text,
  Spacer,
  Stack,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SignUp from "./SignUp";
import LogoIcon from "../../components/LogoMenu/LogoIcon";
import { observer } from "mobx-react";
import DotPattern from "../../components/DotPattern";
import InputWrapper from "../../components/InputWrapper";
import ButtonWrapper from "../../components/ButtonWrapper";
import { useEffect } from 'react';
import { useToast } from "@chakra-ui/react";

function Login({ userStore }) {
  const [signUp, setSignUp] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    userStore.doLogin();
  };
  

  const toast = useToast();
  // status can be "success", "error", "warning" or "info"
  // display toast error message if an error is returned
  useEffect(() => {
    const msg = userStore.errorMSG;
    if(msg.toString().length > 0) {
      toast({
        title: "Error",
        description: msg.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  }, [userStore.errorMSG]);

  if (!signUp) {
    return (
      <Center h="100vh" layerStyle="mainBG">
        <DotPattern />
        <Stack spacing="10" mx="auto" maxW="lg" w="90%">
          <Stack align="center">
            <LogoIcon />
            <Text variant="heading" as="h2" align="center" pt="3">
              Trace Response
            </Text>
          </Stack>
          <form onSubmit={handleLogin}>
            <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
              <Text as="h2" mt={0}>
                Account Login
              </Text>

              <InputGroup size="md">
                <InputWrapper
                  isRequired
                  name="email"
                  placeholder="Email"
                  variant="filled"
                  bg="#efefef"
                  value={userStore.email}
                  onChange={(e) =>
                    userStore.setProperty(e.target.name, e.target.value)
                  }
                />
              </InputGroup>
              <InputGroup size="md">
                <InputWrapper
                  isRequired
                  name="password"
                  type="password"
                  placeholder="Password"
                  variant="filled"
                  bg="#efefef"
                  value={userStore.password}
                  onChange={(e) =>
                    userStore.setProperty(e.target.name, e.target.value)
                  }
                />
              </InputGroup>

              <VStack pt="3">
                <ButtonWrapper
                  variant="gray"
                  type="button"
                  onClick={() => setSignUp(true)}
                >
                  Sign Up
                </ButtonWrapper>
                <Spacer />
                <ButtonWrapper variant="green" type="submit">
                  Login
                </ButtonWrapper>
              </VStack>
            </Stack>
          </form>
        </Stack>
      </Center>
    );
  } else {
    return <SignUp userStore={userStore} setSignUp={setSignUp} />;
  }
}

export default observer(Login);
