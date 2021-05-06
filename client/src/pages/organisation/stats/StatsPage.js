import { Flex, Stack, Text, Spacer, Button } from "@chakra-ui/react";
import React from "react";

function ViewStatistics({ back }) {
  return (
    <Flex h="100vh" layerStyle="function" minW="sm">
      <Stack spacing="10" mx="auto" maxW="lg" p="10" w="90%">
        <Text as="h1" align="center">
          Statistics
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg">
          <Flex>
            <Text as="h2" m={0}>
              Employee Stats
            </Text>
            <Spacer />
          </Flex>
        </Stack>
        <Button variant="gray" onClick={back}>
          BACK
        </Button>
      </Stack>
    </Flex>
  );
}

export default ViewStatistics;
