import React from 'react';
import { Center, VStack, Text, Box } from "@chakra-ui/react";
import QRImage from "../../../components/QRImage";

// react-to-print must be class based components
// maybe avoid using colour since if somebody doesn't have access to a colour printer it can at best, potentially look bad, and at worst make the print out un-readable?
export class PrintableCheckIn extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Box h="100vh" id="Printable-QR-Code-Page">
                <VStack spacing="7" w="100%">
                    <Text variant="heading" as="h2" m={0}>
                        {this.props.business_name}
                    </Text>
                    <Text align="center" w="70%">
                        Check in to our premises
                    </Text>

                    <Center h="50vh">
                        <QRImage src={this.props.qr_code} />
                    </Center>

                </VStack>
            </Box>
        );
    }
}