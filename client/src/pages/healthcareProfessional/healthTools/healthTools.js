import { Flex, Stack, Text, Spacer, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import AddVaccination from "../healthTools/addVaccination";
import UpdateVacination from "../healthTools/updateVaccination";
import AddCase from "../healthTools/addCase";
import FindUserPage from "../findUser/findUserPage";
import { useNavigate } from "react-router";

const HealthTools = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  const [addVaccination, setAddVaccination] = useState(false);
  const [updateVaccination, setUpdateVaccination] = useState(false);
  const [addCase, setAddCase] = useState(false);

  const handleFindingUser = () => {
    // finding user
    const email = document.getElementById("email");
    const id = document.getElementById("userID");

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
    return <FindUserPage handleFindingUser={handleFindingUser} />;
  }
  if (addVaccination) {
    return <AddVaccination />;
  }
  if (updateVaccination) {
    return <UpdateVacination />;
  }
  if (addCase) {
    return <AddCase back={handleAddCase} name={userName} userID={userID} />;
  }

  return (
    <Flex h="100vh" layerStyle="function">
      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Text as="h1" mt={10} mx="auto">
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
          <Stack spacing={4}>
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
        <Button
          variant="gray"
          onClick={() => navigate("/hea/home")}
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
};

export default HealthTools;
