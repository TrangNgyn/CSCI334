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
    <Flex h="100vh" layerStyle="mainBG" minW="sm">
      <Stack spacing="10" mx="auto" maxW="lg" p="10" w="90%">
        <Text as="h1" align="center">
          Add Vacination
        </Text>
        <Box bg="white" rounded="lg" p={8} boxShadow="lg">
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
            mt={3}
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
              mt={3}
            />
          </InputGroup>
          <Checkbox defaultIsChecked display="block" mt={3}>
            Requires follow-up?
          </Checkbox>
          <Button variant="green" w="100%" onClick={back} mt={5}>
            Add Vaccination
          </Button>
        </Box>
        <Button variant="gray" onClick={back}>
          BACK
        </Button>
      </Stack>
    </Flex>
  );
}

export default AddVacination;
