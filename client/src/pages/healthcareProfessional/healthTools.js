import {
  Flex,
  Stack,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddVaccination from "./addVaccination";
import UpdateVacination from "./updateVaccination";
import AddCase from "./addCase";
import FindUser from "./findUser";

const HealthTools = ({ back }) => {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  const [addVaccination, setAddVaccination] = useState(false);
  const [updateVaccination, setUpdateVaccination] = useState(false);
  const [addCase, setAddCase] = useState(false);

  const handleFindingUser = () => {
    // finding user
    const email = document.getElementById("email");
    const id = document.getElementById("userID");
    console.log(email.value, id.value);
    setUserName("Greg Nolls");
    setUserID("195667");
  };

  const handleReset = () => {
    setUserName(null);
    setUserID(null);
  };

  const handleAddVacination = (e) => {
    e.preventDefault();
    setAddVaccination(!addVaccination);
  };

  const handleUpdateVacination = (e) => {
    e.preventDefault();
    setUpdateVaccination(!updateVaccination);
  };

  const handleAddCase = (e) => {
    e.preventDefault();
    setAddCase(!addCase);
  };

  if (userName === null || userID === null) {
    return <FindUser back={back} handleFindingUser={handleFindingUser} />;
  }
  if (addVaccination) {
    return <AddVaccination back={handleAddVacination} />;
  }
  if (updateVaccination) {
    return <UpdateVacination back={handleUpdateVacination} />;
  }
  if (addCase) {
    return (
      <AddCase
        back={handleAddCase}
        submit={back}
        name={userName}
        userID={userID}
      />
    );
  }

  return (
    <Flex h="100vh" layerStyle="mainBG" minW="sm">
      <Stack spacing="10" mx="auto" maxW="lg" p="10" w="90%">
        <Text as="h1" align="center">
          Health Tools
        </Text>
        <Stack bg="white" rounded="lg" p={8} boxShadow="lg">
          <Text as="h2" m={0}>
            {userName}
          </Text>
          <Flex>
            <Text>User ID: </Text>
            <Spacer />
            <Text>{userID}</Text>
          </Flex>
          <Stack>
            <Button variant="green" onClick={handleAddVacination}>
              Add Vacination
            </Button>
            <Button variant="orange" onClick={handleUpdateVacination}>
              Update Vacination
            </Button>
            <Button variant="red" onClick={handleAddCase}>
              Confirm Positive Case
            </Button>
          </Stack>
        </Stack>
        <Button variant="gray" onClick={handleReset}>
          BACK
        </Button>
      </Stack>
    </Flex>
  );
};

export default HealthTools;
