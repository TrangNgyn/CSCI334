import React from "react";
import { VStack, Spacer, Center } from "@chakra-ui/layout";

export default function GrayContainer({ children }) {
  return (
    <VStack h="100%">
      <Spacer />
      <Center w="100%" bg="#EFEFEF" py="16" borderTopRadius="40">
        {children}
      </Center>
    </VStack>
  );
}
