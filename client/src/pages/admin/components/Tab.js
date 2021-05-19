import { Flex, Text, Button, VStack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React from "react";

const AccountTab = ({ civilians, handleDelete }) => {
  const [civilian, setCivilian] = React.useState(civilians[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (civ) => {
    setCivilian(civ);
    onOpen();
  };

  const handleDeleteBtnClicked = () => {
    handleDelete(civilian);
    onClose();
  }

  return (
    <VStack w="100%" p="0">
      {civilians.map((el) => (
        <Flex
          bg="white"
          align="center"
          w="80%"
          maxW={{ base: "90%", md: "container.sm" }}
          rounded="lg"
          p="4"
          boxShadow="lg"
          onClick={() => handleClick(el)}
        >
          <VStack align="left">
            <Text as="h3" m={0}>
              {el.name}
            </Text>
            <Text m={0}>#{el.userId}</Text>
          </VStack>
        </Flex>
      ))}
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{civilian.name}</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
              <Text m={0}>#{civilian.userId}</Text>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" spacing={4}>
              <Button variant="gray" onClick={onClose}>
                Back
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button variant="red">Delete</Button>
                </PopoverTrigger>
                <PopoverContent border={0}>
                  <PopoverArrow />
                  <PopoverHeader>Delete warning!</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack spacing={4}>
                      <Text m={0}>
                        Are you sure you want to delete this user?
                      </Text>
                      <Button variant="red" onClick={handleDeleteBtnClicked}>Yes</Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

export default AccountTab;
