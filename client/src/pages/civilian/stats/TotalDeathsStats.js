import { MdMoodBad } from "react-icons/md";
import { Box, Spacer, Text } from "@chakra-ui/layout";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { AccordionButton, AccordionPanel, AccordionItem } from "@chakra-ui/react"
import { MinusIcon, AddIcon } from '@chakra-ui/icons'

export default function TotalDeathsStats() {
    const userStore = UserStore;

    const currentDeaths = [
        {'key' : 'Total Deaths', 'value': userStore.esri_current_totals[0].Total_Deaths.toLocaleString()},
        {'key' : 'NSW', 'value': userStore.esri_current_totals[0].NSW_Deaths.toLocaleString()},
        {'key' : 'VIC', 'value': userStore.esri_current_totals[0].VIC_Deaths.toLocaleString()},
        {'key' : 'ACT', 'value': userStore.esri_current_totals[0].ACT_Deaths.toLocaleString()},
        {'key' : 'NT', 'value': 0},
        {'key' : 'QLD', 'value': userStore.esri_current_totals[0].QLD_Deaths.toLocaleString()},
        {'key' : 'SA', 'value': userStore.esri_current_totals[0].SA_Deaths.toLocaleString()},
        {'key' : 'TAS', 'value': userStore.esri_current_totals[0].TAS_Deaths.toLocaleString()},
    ];

    return(
        <AccordionItem>
            {({ isExpanded }) => (
                <>
                    <AccordionButton>
                        <Box d="flex" w="100%">
                            <Text as="h3" my="0" color="gray.500">
                                Total Deaths
                            </Text>
                            <Spacer />
                            <Icon as={MdMoodBad} boxSize="6" color="gray.500" />
                        </Box>
                        {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                        ) : (
                        <AddIcon fontSize="12px" />
                        )}
                    </AccordionButton>

                    <AccordionPanel>
                        
                        {/* display total active cases across NSW, grouped by area */}
                        {currentDeaths.map((total, i) => {
                            return(
                                <Box
                                    key={i}
                                    px="3"
                                    w="90%"
                                    maxW={{ base: "90%", md: "container.sm" }}
                                    bg="white"
                                    borderRadius="xl"
                                    shadow="base"
                                >
                                    <Box d="flex" px="3">
                                        <Text as="h3" color="gray.800">
                                            {total['key']}
                                        </Text>
                                        <Spacer />
                                        <Text as="h3">{total['value']}</Text>
                                    </Box>
                                </Box>
                            );
                        })}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
}
