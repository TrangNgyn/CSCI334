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
    <Flex h="100vh" layerStyle="mainBG" minW="sm">
      <Stack spacing="10" mx="auto" maxW="lg" p="10" w="90%">
        <Text as="h1" align="center">
          Health Tools
        </Text>
        <Box bg="white" rounded="lg" p={8} boxShadow="lg">
          <Text as="h2" m={0}>
            Find User
          </Text>
          <InputGroup>
            <Input
              name="email"
              variant="filled"
              bg="#efefef"
              placeholder="Email"
              mt={3}
              id="email"
            ></Input>
          </InputGroup>
          <InputGroup>
            <Input
              name="userID"
              variant="filled"
              bg="#efefef"
              placeholder="User ID"
              mt={3}
              id="userID"
            ></Input>
          </InputGroup>
          <Button variant="green" onClick={handleFindingUser} w="100%" mt={5}>
            Find
          </Button>
        </Box>
        <Button variant="gray" onClick={back}>
          BACK
        </Button>
      </Stack>
    </Flex>
  );
};

export default findUser;
