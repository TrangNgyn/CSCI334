import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function BusinessHome({ handleLogout }) {
  return (
    <Box>
      <Text>Business Home</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}
