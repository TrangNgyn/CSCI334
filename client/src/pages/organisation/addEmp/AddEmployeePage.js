import {
  Stack,
  VStack,
  Text,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { orgMenuRoutes } from "../components/OrgRoutes";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";
import AddEmployeeManually from "./AddEmployeeManuallyPage"

const src= "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [manualAdding, setManualAdding] = useState(false);
  const handleAddManuallyButtonClicked = (e) => {
    e.preventDefault();
    setManualAdding(!manualAdding);
  }

if (manualAdding == true) {
  return <AddEmployeeManually back={handleAddManuallyButtonClicked}/>
}

return (
  <Box h="100vh" layerStyle="mainBG">
    <Box position="absolute" top="5" left="5">
      <LogoMenu menuItems={orgMenuRoutes} />
    </Box>
    <DotPattern></DotPattern>

    <GrayContainer>
      <VStack spacing="7" w="100%">
        <Text variant="heading" as="h2" m={0}>
          Health Org
        </Text>
        <Text align="center" w="70%">
            Have a healthcare worker join the organisation by scanning this QR code
          </Text>
        <VStack
          w="90%"
          maxW={{ base: "90%", md: "container.sm" }}
          spacing="5"
        >
          {/* TO-DO: replace src with the correct qr code */}
          <Image src={src} alt="The QR code of the organisation" w="90%" maxW="250px"/>
          <Button variant="gray" onClick={() => navigate("/org/home")}>
            BACK
          </Button>
          <Button
            variant="green"
            // TO-DO: Add to the database
            onClick={handleAddManuallyButtonClicked}
          >
            Add manually
          </Button>
        </VStack>
      </VStack>
    </GrayContainer>
  </Box>
);
};

export default AddEmployee;