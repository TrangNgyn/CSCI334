import {
  Flex,
  Stack,
  VStack,
  Text,
  InputGroup,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import React from "react";
import viruses from "../components/viruses";

function AddVaccination({ name, userID }) {
  const navigate = useNavigate();

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10} mx="auto">
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
            <Input
              name="date"
              type="date"
              placeholder={Date.now()}
              variant="filled"
              bg="#efefef"
              id="date"
            />
          </InputGroup>
          <Button
            variant="red"
            w="100%"
            onClick={() => navigate("/hea/healthtools")}
          >
            Confirm Positive Case
          </Button>
        </Stack>
        <GrayContainer>
          <VStack
            spacing="7"
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            <Button
              variant="gray"
              onClick={() => navigate("/hea/healthtools")}
              position="fixed"
              bottom={8}
              maxW="lg"
              w="90%"
            >
              BACK
            </Button>
          </VStack>
        </GrayContainer>
      </Stack>
    </Flex>
  );
}

export default AddVaccination;
