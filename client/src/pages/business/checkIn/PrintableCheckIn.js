import React from "react";
import { Center, VStack, Text } from "@chakra-ui/react";
import QRImage from "../../../components/QRImage";

// react-to-print must be class based components
export class PrintableCheckIn extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Center h="100vh" w="100vw" id="Printable-QR-Code-Page">
        <VStack spacing="7" w="100%" p="16">
          <Text variant="heading" fontSize="5xl" m={0}>
            {this.props.business_name}
          </Text>
          <Text align="center" w="70%">
            Check in to our premises
          </Text>

          <Center w="50%" h="100%">
            <QRImage src={this.props.qr_code} />
          </Center>

          <Text variant="heading">Stay Covid Safe</Text>
          <Text>Check out the Trace Response app to beat plague!</Text>
        </VStack>
      </Center>
    );
  }
}
