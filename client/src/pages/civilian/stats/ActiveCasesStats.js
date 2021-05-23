import { useEffect, useState } from "react";
import { MdMoodBad } from "react-icons/md";
import { Box, Spacer, Text } from "@chakra-ui/layout";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { AccordionButton, AccordionPanel, AccordionItem } from "@chakra-ui/react"
import { MinusIcon, AddIcon } from '@chakra-ui/icons'

// show active cases (active being defined by new cases within the last 2 weeks)
export default function ActiveCasesStats() {
    const userStore = UserStore;
    const [groupedStats, setGroupedStats] = useState([]);

    // group active cases across NSW by area
    function groupStats() {
        let temp = [];

        for(let i = 0; i < userStore.activeCasesStats.length; i++) {

            if(temp[userStore.activeCasesStats[i].lhd_2010_name] === undefined) { // if key does not yet exist, define it as an empty array
                temp[userStore.activeCasesStats[i].lhd_2010_name] = [];
            } 
            
            temp[userStore.activeCasesStats[i].lhd_2010_name].push({ // push to array based on location, e.g. Sydney, Northern Sydney, Wollongong, etc.
                'notification_date' : Date(toString(userStore.activeCasesStats[i].notification_date) + ' UTC'), 
                'post_code' : userStore.activeCasesStats[i].post_code
            });

        }

        return temp;
    }

    useEffect(() => {
        setGroupedStats(groupStats());
    }, []);

    return(
        <AccordionItem>
            {({ isExpanded }) => (
                <>
                    <AccordionButton>
                        <Box d="flex" w="100%">
                            <Text as="h3" my="0" color="gray.500">
                                Recent Cases
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
                        {/* display total active cases across NSW */}
                        <Box
                        px="3"
                        w="90%"
                        maxW={{ base: "90%", md: "container.sm" }}
                        bg="white"
                        borderRadius="xl"
                        shadow="base"
                        >
                            <Box d="flex" px="3">
                                <Text as="h3" color="gray.800">
                                    NSW
                                </Text>
                                <Spacer />
                                <Text as="h3">{userStore.activeCasesStats.length}</Text>
                            </Box>
                        </Box>

                        {/* display total active cases across NSW, grouped by area */}
                        {Object.keys(groupedStats).map((keyname, i) => {
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
                                            {keyname.length === 0 ? 'Unknown' : keyname}
                                        </Text>
                                        <Spacer />
                                        <Text as="h3">{groupedStats[keyname].length}</Text>
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