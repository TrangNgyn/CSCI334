import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import HealthTools from "./healthTools";

export default function HealthcareProfessionalHome({ handleLogout }) {
  const [healthTools, setHealthTools] = useState(false);
  
  const handleHealthTools = (e) => {
    e.preventDefault();
    setHealthTools(!healthTools);
  };

  const dashboard = (
    <Box>
      <Text>Healthcare Professional Home</Text>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={handleHealthTools}>HealthTools</Button>
    </Box>
  );

  if (healthTools) {
    return <HealthTools back={handleHealthTools}/>;
  }

  return dashboard;
}
