import {
  Button,
  Center,
  Text,
  Input,
  Spacer,
  Stack,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SignUp from "./SignUp";
import LogoMenu from "../../components/LogoMenu/LogoMenu";
import { civMenuRoutes } from "../pageRoutes/CivRoutes";
import { observer } from "mobx-react";

function Login({ userStore }) {
  const [signUp, setSignUp] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    userStore.doLogin();
  };

  if (!userStore.isLoggedIn) {
    if (!signUp) {
      return (
        <Center h="100vh" layerStyle="mainBG">
          <Stack spacing="10" mx="auto" maxW="lg" w="90%">
            <Stack align="center">
              <LogoMenu menuItems={civMenuRoutes} />
              <Text as="h2" align="center" mt="1">
                Trace Response
              </Text>
            </Stack>
            <form onSubmit={(e) => handleLogin(e)}>
              <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
                <Text as="h2" mt={0}>
                  Login
                </Text>

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
                <VStack pt="3">
                  <Button
                    variant="gray"
                    type="button"
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </Button>
                  <Spacer />
                  <Button variant="green" type="submit">
                    Login
                  </Button>
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
}

export default observer(Login);
