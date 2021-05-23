import React, { useState, useEffect } from 'react';
import { Box, Spacer, Text } from "@chakra-ui/layout";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { AccordionButton, AccordionPanel, AccordionItem } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { GiLoveInjection } from "react-icons/gi";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Label, ResponsiveContainer } from 'recharts';
import moment from 'moment';

// show active cases (active being defined by new cases within the last 2 weeks)
export default function TotalImmunisedStats() {
    const userStore = UserStore;

    const data = userStore.total_vaccinations.map(vac => {
      return {
        date: moment(vac.date).local().format('YYYY-MM-DD'),
        _id: vac._id,
        total_vaccinations: vac.total_vaccinations
    }});
    
    console.log(userStore.ausData14Days);

    // get the last element in the array (today), convert to locale string to give commas to number
    const totalVaccinations = userStore.total_vaccinations[(userStore.total_vaccinations.length - 1)].total_vaccinations.toLocaleString();

    return(
        <AccordionItem>
            {({ isExpanded }) => (
                <>
                    <AccordionButton>
                        <Box d="flex" w="100%" pt="7">
                            <Text as="h3" my="0" color="gray.500">
                                Vaccinations
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
                        <Box
                            px="3"
                            w="90%"
                            maxW={{ base: "100%", md: "container.sm" }}
                            bg="white"
                            borderRadius="xl"
                            shadow="2xl"
                        >
                            <Box d="flex" px="3">
                                <Text as="h3" color="gray.800">
                                    Total vaccinations
                                </Text>
                                <Spacer />
                                <Text as="h3">{totalVaccinations}</Text>
                            </Box>
                        </Box>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
}


{/* <Box d="flex" h="50vh" w="60vw">
    <ResponsiveContainer>
        <LineChart
            data={data}
            margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24
                }}
        >
            <XAxis dataKey="name" />
            <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle" }}
            >
                Sales ($)
            </Label>
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="total_vaccinations" stroke="#ff7300" yAxisId={0} dot={false} />
            <Line type="monotone" dataKey="date" stroke="#387908" yAxisId={1} dot={false} />
        </LineChart>
    </ResponsiveContainer>
</Box> */}
