import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Center, Text } from "@chakra-ui/layout";
import {
  Select,
  Input,
  Flex,
  Spacer,
  Stack,
  Image,
  Heading,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const SignUp = ({ isLoggingIn, signUp, setAccType, accTypes }) => {
  return (
    <Center h="100vh" layerStyle="mainBG">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Stack align="center">
          {/* TO-DO: add logo */}
          <Image borderRadius="full" src="" alt="Trace Response Logo" />
          <Text as="h2" align="center" mt="1">
            Trace Response
          </Text>
        </Stack>
        <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
          <Text as="h2" mt={0}>Sign Up</Text>
          <Select
            name="accType"
            variant="filled"
            onChange={(e) => setAccType(e.target.value)}
            placeholder="Account type"
            bg="#efefef"
          >
            {accTypes.map((el) => (
              <option value={el.id} key={el.id}>{el.name}</option>
            ))}
          </Select>
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
            <Button variant="gray" borderRadius="md" onClick={isLoggingIn} >
              Login
            </Button>
            <Spacer />
            <Button variant="green" borderRadius="md" onClick={signUp}>
              Sign Up
            </Button>
          </Flex>
          <a href="">
            <Text fontSize="sm" mt={3} mb={0} align="center">Sign Up for your organization</Text>
          </a>
        </Stack>
      </Stack>
    </Center>
  );
};

export default SignUp;
