import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react";

export default function VacCentres({ userStore }) {
  return (
    <Box overflow="auto" h="40vh" maxW="container.sm">
      <Table variant="striped" bg="#8BF3B5">
        <TableCaption>
          Source:{" "}
          <a
            href="https://data.gov.au/dataset/ds-vic-01bd667c-e44d-4b9e-91c2-d707dc1a5bd2/details?q=covid"
            target="_blank"
          >
            https://data.gov.au
          </a>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Location</Th>
            <Th>Address</Th>
            <Th>Wait Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userStore.vic_vaccine_locations.map((location) => {
            return (
              <Tr>
                <Td>{location.shortNameClean}</Td>
                <Td>{location.addressFull}</Td>
                <Td>{location.waitPeriodDisp}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
