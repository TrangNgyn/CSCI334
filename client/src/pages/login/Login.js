import { Button } from "@chakra-ui/button";
import { Box, Center, Text } from "@chakra-ui/layout";
import React from "react";

const login = ({ login, setAccType }) => {
  return (
    <Center h="100vh" layerStyle="mainBG">
      <Box bg="white" borderRadius="lg" p={5}>
        <Box>
          <Text as="h2">Login</Text>
        </Box>
        <form>
          <Box>
            <Text>Account type (civ, org, bus)</Text>
            <input
              type="text"
              name="accType"
              onChange={(e) => setAccType(e.target.value)}
            />
          </Box>
          <Box pt="5">
            <Button type="submit" variant="green" onClick={login}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Center>
  );
};

export default login;
