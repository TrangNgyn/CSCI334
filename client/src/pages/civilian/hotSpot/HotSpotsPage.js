import React, { useState, useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import GrayContainer from "../../../components/GrayContainer";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip";
import MapChart from "./HotSpotChart";
import { UserStore } from "../../../stores/UserStore";


export default function HotSpotsPage({ back }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const userStore = UserStore;
  const [groupedStats, setGroupedStats] = useState([]);

  // group active cases across NSW by area
  function groupStats() {
      let temp = [];

      for(let i = 0; i < userStore.activeCasesStats.length; i++) {

          if(temp[userStore.activeCasesStats[i].postcode] === undefined) { // if key does not yet exist, define it as an empty array
              temp[userStore.activeCasesStats[i].postcode] = 0;
          } 
          
          temp[userStore.activeCasesStats[i].postcode] += 1;

      }

      return temp;
  }
  
  useEffect(() => {
      setGroupedStats(groupStats());
  }, []);

  return (
    
    <Box h="100vh" layerStyle="mainBG">
      <GrayContainer>
        <VStack spacing={4} w="100%">
          <Text variant="heading" as="h2" m={0}>
            Hotspot Map
          </Text>
          <Text pb={3}>View local viral activity on the map below</Text>
            <MapChart activeCases={groupedStats} setTooltipContent={setContent} />
            <ReactTooltip effect={"float"}>{content}</ReactTooltip>
          <Button variant="gray" 
          maxW="lg"
          w="90%" onClick={() => navigate(back)}>BACK</Button>
        </VStack>
      </GrayContainer>
    </Box>
  );

}



// const hotspots = [
//   {
//     Lat: -34.4071,
//     Long: 150.8784,
//     Marker: "home"
//   },
//   {
//     Lat: -34.4088,
//     Long: 150.8767,
//     Marker: "covid"
//   }
// ];

// export default function HotSpotsPage({ back }) {
//   const navigate = useNavigate();

//   window.google.charts.load("current", {
//     packages: ["map"],
//     // Note: you will need to get a mapsApiKey for your project.
//     // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
//     mapsApiKey: "AIzaSyCBf-xWc4IRPv4CGohxINQVO4S7o0EXHoY", //huy's key
//   });
//   window.google.charts.setOnLoadCallback(drawChart);

//   function drawChart() {
//     // var data = window.google.visualization.arrayToDataTable([
//     //   ["Lat", "Long", "Name", "Marker"],
//     //   [-34.4071, 150.8784, "Home", "home"],
//     //   [-34.4088, 150.8767, "COVID-19 infected", "covid"],
//     // ]);

//     let arr = [["Lat","Long","Marker"]];
//     hotspots.map((el) => 
//       arr.push([el.Lat, el.Long, el.Marker])
//     );
//     let data = window.google.visualization.arrayToDataTable(arr);
  
    

//     let url =
//       "https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/";

//     var options = {
//       showTooltip: true,
//       showInfoWindow: true,
//       useMapTypeControl: true,
//       icons: {
//         home: {
//           normal: url + "Map-Marker-Ball-Azure-icon.png",
//           selected: url + "Map-Marker-Ball-Right-Azure-icon.png",
//         },
//         covid: {
//           normal: url + "Map-Marker-Ball-Pink-icon.png",
//           selected: url + "Map-Marker-Ball-Right-Pink-icon.png",
//         },
//       },
//     };

//     var map = new window.google.visualization.Map(
//       document.getElementById("map_div")
//     );
//     map.draw(data, options);
//   }
//   return (
//     <Box h="100vh" layerStyle="mainBG">
//       <GrayContainer>
//         <VStack spacing={4} w="100%">
//           <Text variant="heading" as="h2" m={0}>
//             Hotspot Map
//           </Text>
//           <Text pb={3}>View local viral activity on the map below</Text>
//           <Box id="map_div" maxW="3xl" w="90%"></Box>
//           <Button variant="gray" 
//           maxW="lg"
//           w="90%" onClick={() => navigate(back)}>BACK</Button>
//         </VStack>
//       </GrayContainer>
//     </Box>
//   );
// }
