import React from "react";
import { Box, Text } from "@chakra-ui/layout";

export default function HotSpotsPage() {
  window.google.charts.load("current", {
    packages: ["map"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: "AIzaSyCBf-xWc4IRPv4CGohxINQVO4S7o0EXHoY",
  });
  window.google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = window.google.visualization.arrayToDataTable([
      ["Lat", "Long", "Name"],
      [-34.4071, 150.8784, "University"],
    ]);

    var map = new window.google.visualization.Map(
      document.getElementById("map_div")
    );
    map.draw(data, {
      showTooltip: true,
      showInfoWindow: true,
    });
  }

  return (
      <Box id="map_div" h="500px" w="900px"></Box>
  );
}