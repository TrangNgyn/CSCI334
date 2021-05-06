import Icon from "@chakra-ui/icon";
import { Center, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { MdClose } from "react-icons/md";
import { FaRegSmileBeam } from "react-icons/fa";

export default function Dep({ name, remove }) {
  return (
    <Center w="90%" borderRadius="full" bg="white" px="6" py="1">
      <Icon as={FaRegSmileBeam} boxSize={6} color="gray.700" pr="3" />
      <Text>{name}</Text>
      <Spacer />
      <Icon as={MdClose} boxSize={5} onClick={() => remove({ name })} />
    </Center>
  );
}
