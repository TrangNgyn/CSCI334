import {
  Flex,
  Stack,
  Text,
  Box,
  VStack,
  InputGroup,
  Input,
  Button,
  Select,
  HStack,
} from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import viruses from "../components/viruses";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";

function AddVaccination() {
  const navigate = useNavigate();
  const userStore = UserStore;

  const [vaccine, setVaccine] = useState(viruses.vaccines[0].name);
  const [certificateDate, setCertificateDate] = useState(Date.now());
  const [receivedDoses, setReceivedDoses] = useState(1);
  const [recommendedDoses, setRecommendedDoses] = useState(1);
  const [successMSG, setSuccessMSG] = useState("");

  // get found users vaccine status on component mount
  useEffect(() => {
    userStore.healthCareGetVaccineStatus();
  }, []);

  const handleAddVaccination = () => {
    userStore.healthCareUpdateVaccinationStatus(
      vaccine,
      certificateDate,
      recommendedDoses,
      receivedDoses,
      setSuccessMSG
    );
  };

  useEffect(() => {
    if (successMSG.toString().length > 0) {
      setSuccessMSG("");
      navigate("/hea/healthtools");
    }
  }, [successMSG]);

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10} mb="0" mx="auto">
          Add Vaccination
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg" spacing={4}>
          <Text>Vaccine Name</Text>
          <Select
            name="vaccineName"
            variant="filled"
            bg="#efefef"
            id="vaccineName"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
            required
          >
            {viruses.vaccines.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
          <Text>Vaccination Date</Text>
          <InputGroup size="md">
            <Input
              name="date"
              type="date"
              value={certificateDate}
              onChange={(e) => setCertificateDate(e.target.value)}
              variant="filled"
              bg="#efefef"
            />
          </InputGroup>

          <HStack>
            <Box>
              <Text>Current Dose</Text>
              <InputGroup size="md">
                <Input
                  name="dosesReceived"
                  type="number"
                  placeholder={1}
                  min={1}
                  value={receivedDoses}
                  onChange={(e) => setReceivedDoses(e.target.value)}
                  variant="filled"
                  bg="#efefef"
                  required
                />
              </InputGroup>
            </Box>
            <Box>
              <Text>Total Doses</Text>
              <InputGroup size="md">
                <Input
                  name="recommendedDoses"
                  type="number"
                  placeholder={1}
                  min={1}
                  value={recommendedDoses}
                  onChange={(e) => setRecommendedDoses(e.target.value)}
                  variant="filled"
                  bg="#efefef"
                  required
                />
              </InputGroup>
            </Box>
          </HStack>

          <Button
            variant="green"
            w="100%"
            onClick={() => handleAddVaccination()}
          >
            Add Vaccination
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

export default observer(AddVaccination);
