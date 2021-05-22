import { VStack, Text, Box, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../../stores/UserStore";
import QRImage from "../../../components/QRImage";
import ReactToPrint from 'react-to-print';
import { PrintableCheckIn } from './PrintableCheckIn';

const CheckinPage = () => {
  const navigate = useNavigate();
  const userStore = UserStore;
  const qrPrintRef = useRef();

  return (
    <Box h="100vh" layerStyle="mainBG">
    
      {/* render printable page and pass props, not displayed, just for printing */}
      <div style={{ display: "none" }}><PrintableCheckIn ref={qrPrintRef} business_name={userStore.business_name} qr_code={userStore.qr_code} /></div>

      <GrayContainer>
        <VStack spacing="7" w="100%">
          <Text variant="heading" as="h2" m={0}>
            {userStore.business_name}
          </Text>
          <Text align="center" w="70%">
            Check in to our premises
          </Text>
          <QRImage src={userStore.qr_code} />
          <VStack
            w="90%"
            maxW={{ base: "90%", md: "container.sm" }}
            spacing="5"
          >
            <ReactToPrint
              trigger={() => <Button variant="green">Print this page!</Button>}
              content={() => qrPrintRef.current}
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
