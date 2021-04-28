import {
  Button,
  Center,
  Text,
  Input,
  Flex,
  Spacer,
  Stack,
  Image,
  Heading,
  InputGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SignUp from "./SignUp";

function Login({ signUp, login, accTypes, setAccType }) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleIsLoggingIn = (e) => {
    e.preventDefault();
    setIsLoggingIn(!isLoggingIn);
  };
  if (isLoggingIn) {
    return (
      <Center h="100vh" layerStyle="mainBG">
        <Stack spacing="10" mx="auto" maxW="md" w="90%">
          <Stack align="center">
            <Image borderRadius="full" src="" alt="Trace Response Logo" />
            <Text as="h2" align="center" mt="1">
              Trace Response
            </Text>
            <Heading align="center">Login</Heading>
          </Stack>
          <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
            <InputGroup size="md">
              {/* TO-DO: add isRequired */}
              <Input
                name="email"
                placeholder="Email"
                variant="filled"
                bg="#efefef"
              />
            </InputGroup>
            <InputGroup size="md">
              {/* TO-DO: add isRequired */}
              <Input
                name="password"
                type="password"
                placeholder="Password"
                variant="filled"
                bg="#efefef"
              />
            </InputGroup>
            <Flex>
              <Button
                variant="gray"
                borderRadius="md"
                onClick={handleIsLoggingIn}
              >
                Sign Up
              </Button>
              <Spacer />
              <Button variant="green" borderRadius="md" onClick={login}>
                Login
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Center>
    );
  } else {
    return (
      <SignUp
        signUp={signUp}
        accTypes={accTypes}
        setAccType={setAccType}
        isLoggingIn={handleIsLoggingIn}
      />
    );
  }
}

export default Login;
