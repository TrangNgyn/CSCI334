import React, { useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  List, 
  ListItem, 
  ListIcon
 } from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import { MdCheckCircle } from "react-icons/md"

function RolloutsPage({ back }) {
  const navigate = useNavigate();
  const userStore = UserStore;

  useEffect(() => {
    userStore.getVaccineLocations();
  }, []);
  
  return (
    <Box h="100vh" layerStyle="mainBG">
      <GrayContainer>
        <VStack spacing={4} w="100%">
          <Text variant="heading" as="h2" m={0}>
            Rollout Plan
          </Text>

          <Box w="70vw">
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab>Phase 1a</Tab>
                <Tab>Phase 1b</Tab>
                <Tab>Phase 2a</Tab>
                <Tab>Phase 2b</Tab>
                <Tab>Phase 3</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>You're eligible for Phase 1a if you're any of the following:</p>
                  <p>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Quarantine and border workers
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Frontline health care worker sub-groups for prioritisation
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Aged care and disability care staff
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Aged care and disability care residents
                      </ListItem>
                    </List>
                  </p>
                  <p>Planned rollout date: Currently Ongoing</p>
                </TabPanel>
                <TabPanel>
                  <p>You're eligible for Phase 1b if you're any of the following:</p>
                  <p>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Healthcare workers currently employed and not included in Phase 1a
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Household contacts of quarantine and border workers
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Critical and high risk workers who are currently employed including defence, police, fire, emergency services and meat processing
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Essential outbound travellers with a travel exemption
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Elderly people aged 70 years and over
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Aboriginal and Torres Strait Islander people aged 50 years and over
                      </ListItem>
                    </List>
                  </p>
                  <p>Planned rollout date: Currently Ongoing</p>
                </TabPanel>
                <TabPanel>
                  <p>You're eligible for Phase 2a if you're any of the following:</p>
                  <p>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        People aged 50 years and over
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Aboriginal and Torres Strait Islander people aged 16-49 years
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Other critical and high risk workers
                      </ListItem>
                    </List>
                  </p>
                  <p>Planned rollout date: 3 May 2021</p>
                </TabPanel>
                <TabPanel>
                  <p>You're eligible for Phase 2b if you're any of the following:</p>
                  <p>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        People aged 16-49 years
                      </ListItem>
                    </List>
                  </p>
                  <p>Planned rollout date: Unknown</p>
                </TabPanel>
                <TabPanel>
                  <p>You're eligible for Phase 3 if you're any of the following:</p>
                  <p>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        People aged less than 16 years if under
                      </ListItem>
                    </List>
                  </p>
                  <p>Planned rollout date: Unknown</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Text fontSize="xs">
              Source: <a href="https://www.health.gov.au/initiatives-and-programs/covid-19-vaccines/getting-vaccinated-for-covid-19/when-will-i-get-a-covid-19-vaccine" target="_blank">https://www.health.gov.au</a>
            </Text>
          </Box>

          <Text>
            <a href="https://covid-vaccine.healthdirect.gov.au/eligibility" target="_blank">Click Here</a> to find out if you're eligible for vaccination.
          </Text>

          <Text variant="sub-heading" as="h1" m={0}>
            Vaccination Centers
          </Text>
          <Box overflow="auto" h="40vh" w="90vw">
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Source: <a href="https://data.gov.au/dataset/ds-vic-01bd667c-e44d-4b9e-91c2-d707dc1a5bd2/details?q=covid" target="_blank">https://data.gov.au</a></TableCaption>
              <Thead>
                <Tr>
                  <Th>Location</Th>
                  <Th>Address</Th>
                  <Th>Wait Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userStore.vic_vaccine_locations.map((location) => {
                  return(
                    <Tr>
                      <Td>{location.shortNameClean}</Td>
                      <Td>{location.addressFull}</Td>
                      <Td>{location.waitPeriodDisp}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Button variant="gray" 
            maxW="lg"
            w="90%" onClick={() => navigate(back)}
          >
            BACK
          </Button>

        </VStack>
      </GrayContainer>
    </Box>
  );
}

export default observer(RolloutsPage)

// const rollouts = [
//   {
//     Lat: -34.4071,
//     Long: 150.8784,
//     Marker: "home"
//   },
//   {
//     Lat: -34.4088,
//     Long: 150.8767,
//     Marker: "vaccinationPoint"
//   }
// ];

// window.google.charts.load("current", {
//   packages: ["map"],
//   // Note: you will need to get a mapsApiKey for your project.
//   // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
//   mapsApiKey: "AIzaSyCBf-xWc4IRPv4CGohxINQVO4S7o0EXHoY", //huy's key
// });
// window.google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   // var data = window.google.visualization.arrayToDataTable([
//   //   ["Lat", "Long", "Name", "Marker"],
//   //   [-34.4071, 150.8784, "Home", "home"],
//   //   [-34.4088, 150.8767, "COVID-19 infected", "covid"],
//   // ]);

//   let arr = [["Lat","Long","Marker"]];
//   rollouts.map((el) => 
//     arr.push([el.Lat, el.Long, el.Marker])
//   );
//   let data = window.google.visualization.arrayToDataTable(arr);

//   let url =
//     "https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/";

//   var options = {
//     showTooltip: true,
//     showInfoWindow: true,
//     useMapTypeControl: true,
//     icons: {
//       home: {
//         normal: url + "Map-Marker-Ball-Azure-icon.png",
//         selected: url + "Map-Marker-Ball-Right-Azure-icon.png",
//       },
//       vaccinationPoint: {
//         normal:   url + 'Map-Marker-Push-Pin-1-Chartreuse-icon.png',
//         selected: url + 'Map-Marker-Push-Pin-1-Right-Chartreuse-icon.png'
//       }
//     },
//   };

//   var map = new window.google.visualization.Map(
//     document.getElementById("map_div")
//   );
//   map.draw(data, options);
// }


{/* <Text pb={3}>View local viral activity on the map below</Text>
<Box id="map_div" maxW="3xl" w="90%"></Box>
<Button variant="gray" 
maxW="lg"
w="90%" onClick={() => navigate(back)}>BACK</Button> */}
