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
import { useState } from "react";

const AccountTabPending = ({ pendingOrganisations, handleVerify, handleDeny }) => {
    const [organisation, setOrganisation] = useState(pendingOrganisations[0]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = (civ) => {
      setOrganisation(civ);
      onOpen();
    };
  
    const handleVerifyBtnClicked = () => {
      handleVerify(organisation);
      onClose();
    }

    const handleDenyBtnClicked = () => {
      handleDeny(organisation);
      onClose();
    }
  
    return (
    <VStack w="100%" p="0">
      {pendingOrganisations.map((el) => (
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
              {el.email}
            </Text>
            <Text m={0}>{el.name}</Text>
          </VStack>
        </Flex>
      ))}
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{organisation.email}</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
              <Text m={0}>{organisation.name}</Text>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" spacing={4}>
              <Button variant="gray" onClick={onClose}>
                Back
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button variant="red">Deny</Button>
                </PopoverTrigger>
                <PopoverContent border={0}>
                  <PopoverArrow />
                  <PopoverHeader>Warning!</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack spacing={4}>
                      <Text m={0}>
                        Are you sure you want to deny this organization?
                      </Text>
                      <Button variant="red" onClick={handleDenyBtnClicked}>Yes</Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <Button variant="green">verify</Button>
                </PopoverTrigger>
                <PopoverContent border={0}>
                  <PopoverArrow />
                  <PopoverHeader>Warning!</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack spacing={4}>
                      <Text m={0}>
                        Are you sure you want to verify this organization?
                      </Text>
                      <Button variant="green" onClick={handleVerifyBtnClicked}>Yes</Button>
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

export default AccountTabPending;