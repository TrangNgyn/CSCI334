import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Text,
    VStack,
    Button,
    Box,
  } from "@chakra-ui/react";

  const Notifications = ({ onClose, isOpen, alerts  }) => {
    return (
        <Drawer onClose={onClose} isOpen={isOpen} size={"lg"} zIndex="0">
        <DrawerOverlay/>
        <DrawerContent bg="#EFEFEF" overflow="scroll">
          <DrawerHeader>Notifications</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left">
                  <Box bg="white"
                  w="90%"
                  rounded="lg"
                  p="4"
                  boxShadow="lg">
                    <VStack align="left">
                      <Text as="h3" m={0}>Under development</Text>
                    </VStack>
                  </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" spacing={4}>
              <Button variant="gray" onClick={onClose}>
                Back
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
}

  export default Notifications;