import Icon from "@chakra-ui/icon";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { BiAward } from "react-icons/bi";

export default function Certificate({ content }) {

  return (
    <Box
      bg="white"
      py="4"
      px="4"
      borderRadius="xl"
      shadow="2xl"
      w="90%"
      minHeight="60px"
    >
      <HStack>
        <Icon as={BiAward} boxSize="12" pr="2" />
        <VStack spacing={0} pt="2">
          <Text as="h2" color="gray.800" textAlign="start" my="0" w="100%">
            {content.vaccine_type}
          </Text>
          <Box>
            <Text textAlign="start" display="inline-block">
            </Text>
            <Text
              pl="1"
              textAlign="start"
              display="inline-block"
            >
              {content.doses_received} of {content.recommended_doses} doses received.
            </Text>
          </Box>
          <Box>
            <Text textAlign="start" display="inline-block">
              status:
            </Text>
            <Text
              pl="1"
              textAlign="start"
              display="inline-block"
              color={content.doses_received === content.recommended_doses ? "green.500" : "red.400"}
            >
              {content.doses_received === content.recommended_doses ? "Completed" : "Ongoing"}
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}
