import {
    Flex,
    Stack,
    Text,
    Box,
    InputGroup,
    Input,
    Button,
    Select,
    Checkbox,
  } from "@chakra-ui/react";
import React from "react";
import viruses from "./viruses"

function AddVacination({ back, name, userID }) {

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10}mx="auto">
          Confirm Positive Case
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
          <Text as="h2" mt={0}>
            Confirm Positive Case
          </Text>
          <Select
            name="virusName"
            variant="filled"
            placeholder="Virus name"
            bg="#efefef"
            id="virusName"
          >
            {viruses.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
          <InputGroup size="md">
            {/* TO-DO: add isRequired */}
            <Input
              name="date"
              type="date"
              placeholder={Date.now()}
              variant="filled"
              bg="#efefef"
              id="date"
            />
          </InputGroup>
          <Button variant="red" w="100%" onClick={back}>
            Confirm Positive Case
          </Button>
        </Stack>
        <Button variant="gray" onClick={back} position="fixed" bottom={8} maxW="lg" w="90%">
          BACK
        </Button>
      </Stack>
    </Flex>
  );
}

export default AddVacination;
