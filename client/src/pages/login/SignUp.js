import { Button } from "@chakra-ui/button";
import { Center, Text, VStack } from "@chakra-ui/layout";
import {
  Select,
  Input,
  Flex,
  Spacer,
  Stack,
  Image,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import React from "react";
import { observer } from "mobx-react";

const accTypes = [
  { name: "Civilian", id: "civ" },
  { name: "Business", id: "bus" },
  { name: "Healthcare Professional", id: "hea" },
  { name: "Organization", id: "org" },
];

const SignUp = ({ userStore, setSignUp }) => {
  return (
    <Center h="100vh" layerStyle="mainBG">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Stack align="center"></Stack>
        <form onSubmit={() => userStore.doLogin()}>
          <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
            <Text as="h2" mt={0}>
              Sign Up
            </Text>
            <Select
              name="accType"
              variant="filled"
              onChange={(e) =>
                userStore.setProperty(e.target.name, e.target.value)
              }
              bg="#efefef"
            >
              {accTypes.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
            <InputGroup size="md">
              <Input
                isRequired
                name="email"
                placeholder="Email"
                value={userStore.email}
                onChange={(e) =>
                  userStore.setProperty(e.target.name, e.target.value)
                }
                variant="filled"
                bg="#efefef"
              />
            </InputGroup>
            <InputGroup size="md">
              <Input
                isRequired
                name="password"
                type="password"
                value={userStore.password}
                placeholder="Password"
                variant="filled"
                bg="#efefef"
                onChange={(e) =>
                  userStore.setProperty(e.target.name, e.target.value)
                }
              />
            </InputGroup>
            <VStack pt="3">
              <Button variant="green" borderRadius="md" type="submit">
                Sign Up
              </Button>
              <Spacer />
              <Button
                variant="gray"
                type="button"
                borderRadius="md"
                onClick={() => setSignUp(false)}
              >
                Back
              </Button>
            </VStack>
            <a href="">
              <Text fontSize="sm" mt={3} mb={0} align="center">
                Sign Up for your organization
              </Text>
            </a>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default observer(SignUp);
