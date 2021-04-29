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
import React, { useState } from "react";
import viruses from "./viruses"

function AddVacination({ back }) {
  const [virusName, setVirusName] = useState(false);
  const handleVirusName = (id) => {
    setVirusName(id);
    document.getElementById("vaccineName").removeAttribute("disabled");
  };

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10}mx="auto">
          Add Vaccination
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
          <Text as="h2" mt={0}>
            Vaccination Certificate
          </Text>
          <Select
            name="virusName"
            variant="filled"
            placeholder="Virus name"
            bg="#efefef"
            onChange={(e) => handleVirusName(e.target.value)}
          >
            {viruses.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
          <Select
            name="vaccineName"
            variant="filled"
            placeholder="Vaccine name"
            bg="#efefef"
            id="vaccineName"
            disabled
          >
            {virusName !== false
              ? viruses
                  .find((el) => el.id === virusName)
                  .vaccines.map((el) => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))
              : null}
          </Select>
          <InputGroup size="md">
            {/* TO-DO: add isRequired */}
            <Input
              name="date"
              type="date"
              placeholder={Date.now()}
              variant="filled"
              bg="#efefef"
            />
          </InputGroup>
          <Checkbox defaultIsChecked display="block">
            Requires follow-up?
          </Checkbox>
          <Button variant="green" w="100%" onClick={back}>
            Add Vaccination
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
