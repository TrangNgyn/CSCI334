import { Flex, Text, Spacer } from "@chakra-ui/react";
import React from "react";

function StatisticMap({ name, number }) {
  return (
    <Flex bg="white">
      <Text as="h2">{name}</Text>
      <Spacer />
      <Text as="h2">{number}</Text>
    </Flex>
  );
}

export default StatisticMap;
