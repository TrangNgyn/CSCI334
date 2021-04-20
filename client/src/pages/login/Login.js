import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { Container } from "react-bootstrap";

const login = ({ login }) => {
  return (
    <Center h="100vh" layerStyle="mainBG">
      <Box>
        <Text as="h2">Login</Text>
      </Box>
      <Box>
        <Container maxW="conatiner.sm">
          <form>
            <input type="text" name="accType" />
            <Button type="submit" variant="green" onClick={login}>
              Login
            </Button>
          </form>
        </Container>
      </Box>
    </Center>
  );
};

export default login;
