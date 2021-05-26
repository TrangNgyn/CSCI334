import {
  Flex,
  Stack,
  Text,
  VStack,
  InputGroup,
  Input,
  Button,
  Select,
  HStack,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import viruses from "../components/viruses";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react";
import ToastStatusMessageWrapper from "../../../components/ToastStatusMessageWrapper";

function UpdateVaccination() {
  const navigate = useNavigate();
  const userStore = UserStore;

  const [vaccine, setVaccine] = useState(viruses.vaccines[0].name);
  const [certificateDate, setCertificateDate] = useState(Date.now());
  const [receivedDoses, setReceivedDoses] = useState(1);
  const [recommendedDoses, setRecommendedDoses] = useState(1);

  // get found users vaccine status on component mount
  useEffect(() => {
    userStore.healthCareGetVaccineStatus();
  }, []);

  useEffect(() => {
    if (typeof userStore.foundUser.vaccine_status !== "undefined") {
      // if vaccine status has been retrieved
      setVaccine(userStore.foundUser.vaccine_status.vaccine_type);
      setCertificateDate(userStore.foundUser.vaccine_status.date);
      setReceivedDoses(userStore.foundUser.vaccine_status.doses_received);
      setRecommendedDoses(userStore.foundUser.vaccine_status.recommended_doses);
    }
  }, [userStore.foundUser.vaccine_status]);

  const handleAddVaccination = () => {
    userStore.healthCareUpdateVaccinationStatus(
      vaccine,
      certificateDate,
      recommendedDoses,
      receivedDoses
    );
  };

  useEffect(() => {
    if (userStore.operationWasSuccessful) {
      userStore.setProperty("operationWasSuccessful", false);
      navigate("/hea/healthtools");
    }
  }, [userStore.operationWasSuccessful]);

  return (
    <ToastStatusMessageWrapper>
      <Flex h="100vh" layerStyle="function">
        <Stack spacing="10" mx="auto" maxW="lg" w="90%">
          <Text as="h1" mt={10} mx="auto">
            Update Vaccination
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
              variant="orange"
              w="100%"
              onClick={() => handleAddVaccination()}
            >
              Update Vaccination
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
    </ToastStatusMessageWrapper>
  );
}

export default observer(UpdateVaccination);
