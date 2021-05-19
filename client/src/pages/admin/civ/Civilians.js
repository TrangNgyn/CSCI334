import {
  VStack,
  Text,
  Box,
  Button,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { adMenuRoutes } from "../components/adRoutes";
import AccountTab from "../components/Tab";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";

// TO-DO: replace civs by real civilians
const civs = [
  {
    name: "Allen Thompson",
    userId: "123141",
  },
  {
    name: "Hannah Smith",
    userId: "121323",
  },
  {
    name: "Ryan Peterson",
    userId: "121231",
  },
  {
    name: "Allen Thompson",
    userId: "123141",
  },
  {
    name: "Hannah Smith",
    userId: "121323",
  },
  {
    name: "Ryan Peterson",
    userId: "121231",
  },
];

const FindUserPage = () => {
  const navigate = useNavigate();
  const [civilians, setCivilians] = useState(civs);

  const handleDelete = (civilian) => {
    civilians.splice(civilians.indexOf(civilian), 1);
    setCivilians(civilians);
    //   TO-DO: Update database
  };

  const handleUserSearch = (e) => {
    if (e.target.value === "") {
         setCivilians(civs);
    } else {
        const results = civs.filter((el) => el.userId.includes(e.target.value));
        setCivilians(results); 
    }
  }

  return (
    <Box h="100vh" w="100%" position="relative" overflow="scroll" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={adMenuRoutes} />
      </Box>
      <DotPattern />
      <VStack
        position="absolute"
        top="140px"
        left="0"
        right="0"
        justify="center"
        align="center"
        pb="180px"
      >
        <Box
          bg="white"
          w="80%"
          maxW={{ base: "90%", md: "container.sm" }}
          rounded="lg"
          p="4"
          boxShadow="lg"
        >
          <Text variant="heading" as="h2" align="center" pt="3">
            Civilians
          </Text>
          <InputGroup>
            <Input
              name="userId"
              variant="filled"
              bg="#efefef"
              placeholder="User ID"
                onChange={(e) => handleUserSearch(e)}
            />
          </InputGroup>
        </Box>
        <AccountTab civilians={civilians} handleDelete={handleDelete}/>
      </VStack>

      <GrayContainer>
        <VStack spacing="7" w="100%">
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <Button variant="gray" onClick={() => navigate("/ad/home")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default FindUserPage;
