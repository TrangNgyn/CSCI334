
import React, { useState, useEffect } from 'react';
import { Box, Spacer, Text } from "@chakra-ui/layout";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { AccordionButton, AccordionPanel, AccordionItem } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { GiLoveInjection } from "react-icons/gi";

// show active cases (active being defined by new cases within the last 2 weeks)
export default function TotalImmunisedStats() {
    const userStore = UserStore;
    
    const currentVaccinations = [
        {'key' : 'Total', 'value': (
                                    userStore.esri_current_totals[0].NSW_Tests 
                                    + userStore.esri_current_totals[0].VIC_Tests 
                                    + userStore.esri_current_totals[0].ACT_Tests
                                    + userStore.esri_current_totals[0].NT_Tests
                                    + userStore.esri_current_totals[0].QLD_Tests
                                    + userStore.esri_current_totals[0].SA_Tests
                                    + userStore.esri_current_totals[0].TAS_Tests
                                ).toLocaleString()},
        {'key' : 'NSW', 'value': userStore.esri_current_totals[0].NSW_Tests.toLocaleString()},
        {'key' : 'VIC', 'value': userStore.esri_current_totals[0].VIC_Tests.toLocaleString()},
        {'key' : 'ACT', 'value': userStore.esri_current_totals[0].ACT_Tests.toLocaleString()},
        {'key' : 'NT', 'value': userStore.esri_current_totals[0].NT_Tests.toLocaleString()},
        {'key' : 'QLD', 'value': userStore.esri_current_totals[0].QLD_Tests.toLocaleString()},
        {'key' : 'SA', 'value': userStore.esri_current_totals[0].SA_Tests.toLocaleString()},
        {'key' : 'TAS', 'value': userStore.esri_current_totals[0].TAS_Tests.toLocaleString()},
    ];

    return(
        <AccordionItem>
            {({ isExpanded }) => (
                <>
                    <AccordionButton>
                        <Box d="flex" w="100%" pt="7">
                            <Text as="h3" my="0" color="gray.500">
                                Tests Performed
                            </Text>
                            <Spacer />
                            <Icon as={GiLoveInjection} boxSize="6" color="gray.500" />
                        </Box>
                        {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                            ) : (
                            <AddIcon fontSize="12px" />
                        )}
                    </AccordionButton>
                    <AccordionPanel>

                        {/* display total active cases across NSW, grouped by area */}
                        {currentVaccinations.map((total, i) => {
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
