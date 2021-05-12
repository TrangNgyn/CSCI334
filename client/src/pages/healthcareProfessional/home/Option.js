import Icon from "@chakra-ui/icon";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { useNavigate } from "react-router";

export default function Option({ content }) {
  let { icon, title, desc, route } = content;
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      py="4"
      px="4"
      borderRadius="xl"
      w="90%"
      minHeight="40px"
      onClick={() => navigate(route)}
      _hover={{ bg: "gray.200", cursor: "pointer" }}
    >
      <HStack>
        <Icon as={icon} boxSize="10" pr="2" />
        <VStack>
          <Text as="h3" color="gray.800" textAlign="start" my="1" w="100%">
            {title}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
