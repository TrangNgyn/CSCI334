import { Button } from "@chakra-ui/button";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { UserStore } from "../../../stores/UserStore";
import Dep from "./Dep";
import AddDepMenu from "./AddDepMenu";
import { observer } from "mobx-react";

function AddDependants({ showDeps }) {
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="foodBG">
      <GrayContainer>
        <VStack spacing="0">
          <Text variant="heading" as="h2">
            Add Dependants
          </Text>
          <Text align="center" w="70%" pb="8">
            Add anyone who is unable to add themselves
          </Text>
          <Box
            overflowY="scroll"
            w="100%"
            maxH="300px"
            p="5"
            borderRadius="3xl"
          >
            <VStack spacing="3">
              {userStore.dependants.map((dep) => (
                <Dep key={dep} name={dep} remove={userStore.removeDependant} />
              ))}
            </VStack>
          </Box>
          <Flex justify="flex-end" w="100%" pt="3" pb="8">
            <AddDepMenu />
          </Flex>

          <Button variant="green" onClick={() => showDeps(false)}>
            Accept
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}

export default observer(AddDependants);
