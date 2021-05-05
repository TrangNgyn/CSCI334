import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function OrganisationHome({ handleLogout }) {
  return (
    <Box>
      <Text>Organisation Home</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}
