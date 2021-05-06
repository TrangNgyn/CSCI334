import { Box, VStack, Text } from "@chakra-ui/layout";
import { observer } from "mobx-react";
import React from "react";
import { UserStore } from "../../../stores/UserStore";
import Dep from "./Dep";

function Dependants() {
  const userStore = UserStore;

  return (
    <Box>
      <VStack>
        <Text variant="heading" as="h2">
          Add Dependants
        </Text>
        <Text align="center" w="70%">
          Add anyone who is unable to add themselves
        </Text>
        {userStore.dependants.map((dep) => (
          <Dep key={dep} name={dep} />
        ))}
      </VStack>
    </Box>
  );
}

export default observer(Dependants);
