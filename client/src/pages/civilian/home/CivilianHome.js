import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function CivilianHome({ handleLogout }) {
  return (
    <Box>
      <Text>Civilian Home</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}
