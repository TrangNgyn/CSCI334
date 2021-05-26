import {
  Flex,
  Stack,
  Text,
  InputGroup,
  Input,
  Button,
  Select
} from "@chakra-ui/react";
import React from "react";

function ConfirmDetails({ back, submit, name, userID }) {
  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10} mx="auto">
          Health Tools
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg">
          <Text as="h2" mt={0}>
            Confirm Details
          </Text>
          <Select
            name="virusName"
            variant="filled"
            placeholder="Virus name"
            bg="#efefef"
            id="virusName"
            mt={3}
          >
          </Select>
          <InputGroup size="md">
            {/* TO-DO: add isRequired */}
            <Input
              name="date"
              type="date"
              placeholder={Date.now()}
              variant="filled"
              bg="#efefef"
              mt={3}
              id="date"
            />
          </InputGroup>
          <Button variant="red" mt={5} w="100%" onClick={submit}>
            Submit
          </Button>
        </Stack>
        <Button
          variant="gray"
          onClick={back}
          position="fixed"
          bottom={8}
          maxW="lg"
          w="90%"
        >
          BACK
        </Button>
      </Stack>
    </Flex>
  );
}

export default ConfirmDetails;
