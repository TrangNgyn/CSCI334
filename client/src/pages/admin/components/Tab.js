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

const AccountTab = ({ verifiedOrganisations, handleOrganisationVerification, setUpdateOrgList }) => {
  const [organisation, setOrganisation] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (org) => {
    setOrganisation(org);
    onOpen();
  };

  const handleRevokeBtnClicked = () => {
    handleOrganisationVerification(organisation.email, false); // revoke a verified organisations account and deactivate their account
    onClose();
    setUpdateOrgList(true);
  }

  return (
    <VStack w="100%" p="0">
      {verifiedOrganisations.map((el) => (
        <Flex
          key={el.email}
          bg="white"
          align="center"
          w="80%"
          maxW={{ base: "90%", md: "container.sm" }}
          rounded="lg"
          p="4"
          boxShadow="lg"
          cursor="pointer"
          onClick={() => handleClick(el)}
        >
          <VStack align="left">
            <Text as="h3" m={0}>
              {el.email}
            </Text>
            <Text m={0}>{el.organisation_name}</Text>
          </VStack>
        </Flex>
      ))}
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{organisation.email}</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
              <Text m={0}>{organisation.organisation_name}</Text>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" spacing={4}>
              <Button variant="gray" onClick={onClose}>
                Back
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button variant="red">Revoke Organisation</Button>
                </PopoverTrigger>
                <PopoverContent border={0}>
                  <PopoverArrow />
                  <PopoverHeader>Revoke privilege warning!</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack spacing={4}>
                      <Text m={0}>
                        Are you sure you want to revoke this users organisation status?
                      </Text>
                      <Button variant="red" onClick={handleRevokeBtnClicked}>Yes</Button>
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
