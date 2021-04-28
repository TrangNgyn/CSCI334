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
  
  function ConfirmDetails({ back, submit, name, userID }) {

    return (
      <Flex h="100vh" layerStyle="mainBG" minW="sm">
        <Stack spacing="10" mx="auto" maxW="lg" p="10" w="90%">
          <Text as="h1" align="center">
            Confirm Infection
          </Text>
          <Box bg="white" rounded="lg" p={8} boxShadow="lg">
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
                mt={3}
                id="date"
              />
            </InputGroup>
            <Button variant="red" mt={5} w="100%" onClick={submit}>
              Submit
            </Button>
          </Box>
          <Button variant="gray" onClick={back}>
            BACK
          </Button>
        </Stack>
      </Flex>
    );
  }
  
  export default ConfirmDetails;
  