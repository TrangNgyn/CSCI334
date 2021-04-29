import {
  Flex,
  Stack,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const findUser = ({ back, handleFindingUser }) => {
  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10}mx="auto">
          Health Tools
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
          <Text as="h2" m={0}>
            Find User
          </Text>
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
          <Button variant="green" onClick={handleFindingUser} w="100%">
            Find
          </Button>
        </Stack>
        <Button variant="gray" onClick={back} position="fixed" bottom={8} maxW="lg" w="90%">
          BACK
        </Button>
      </Stack>
    </Flex>
  );
};

export default findUser;
