import { Box, Spacer, Text } from "@chakra-ui/layout";
import React from "react";

export default function StatItem({ title, value }) {
  return (
    <Box layerStyle="statItem">
      <Box d="flex" px="3">
        <Text as="h3">{title}</Text>
        <Spacer />
        <Text as="h3">{value}</Text>
      </Box>
    </Box>
  );
}
