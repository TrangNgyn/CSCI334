import { Button } from "@chakra-ui/button";
import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { MdMoodBad } from "react-icons/md";
import { GiLoveInjection } from "react-icons/gi";
export default function StatsPage() {
  const navigate = useNavigate();
  const userStore = UserStore;

  return (
    <Box h="100vh" layerStyle="grayBG">
      <Box position="absolute" h="100%" w="100%" top="40px">
        <Flex justifyContent="center" alignItems="flex-start">
          <VStack
            spacing="3"
            w="90%"
            minH="80%"
            maxW={{ base: "90%", md: "container.sm" }}
          >
            <Text variant="heading" mb="3">
              Statistics
            </Text>
            <Box d="flex" w="90%">
              <Text as="h3" my="0" color="gray.500">
                Active Cases
              </Text>
              <Spacer />
              <Icon as={MdMoodBad} boxSize="6" color="gray.500" />
            </Box>

            {userStore.stats.map(
              (item, i) =>
                i < 3 && (
                  <Box
                    key={item.key}
                    px="3"
                    w="90%"
                    maxW={{ base: "90%", md: "container.sm" }}
                    bg="white"
                    borderRadius="xl"
                    shadow="2xl"
                  >
                    <Box d="flex" px="3">
                      <Text as="h3" color="gray.800">
                        {item.key}
                      </Text>
                      <Spacer />
                      <Text as="h3">{item.value}</Text>
                    </Box>
                  </Box>
                )
            )}

            <Box d="flex" w="90%" pt="7">
              <Text as="h3" my="0" color="gray.500">
                Active Cases
              </Text>
              <Spacer />
              <Icon as={GiLoveInjection} boxSize="6" color="gray.500" />
            </Box>
            <Box
              px="3"
              w="90%"
              maxW={{ base: "90%", md: "container.sm" }}
              bg="white"
              borderRadius="xl"
              shadow="2xl"
            >
              <Box d="flex" px="3">
                <Text as="h3" color="gray.800">
                  {userStore.stats[3].key}
                </Text>
                <Spacer />
                <Text as="h3">{userStore.stats[3].value}</Text>
              </Box>
            </Box>
          </VStack>
        </Flex>
      </Box>
      <GrayContainer>
        <VStack spacing="7" w="90%" maxW={{ base: "90%", md: "container.sm" }}>
          <Button variant="gray" onClick={() => navigate("/civ/home")}>
            Back
          </Button>
        </VStack>
      </GrayContainer>
    </Box>
  );
}
