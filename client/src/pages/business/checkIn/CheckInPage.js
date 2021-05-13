import { VStack, Text, Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import LogoMenu from "../../../components/LogoMenu/LogoMenu";
import GrayContainer from "../../../components/GrayContainer";
import DotPattern from "../../../components/DotPattern";
import { useNavigate } from "react-router-dom";

const src =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png";

const CheckinPage = () => {
  const navigate = useNavigate();

  return (
    <Box h="100vh" layerStyle="mainBG">
      <Box position="absolute" top="5" left="5">
        <LogoMenu menuItems={[]} />
      </Box>
      <DotPattern></DotPattern>

      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Text variant="heading" as="h2" m={0}>
            Momo kitchen
          </Text>
          <Text align="center" w="70%">
            Check in to our premises
          </Text>
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            {/* TO-DO: replace src with the correct qr code */}
            <Image
              src={src}
              alt="The QR code of the organisation"
              w="90%"
              maxW="250px"
            />
            <Button variant="gray" onClick={() => navigate("/")}>
              BACK
            </Button>
          </VStack>
        </VStack>
      </GrayContainer>
    </Box>
  );
};

export default CheckinPage;
