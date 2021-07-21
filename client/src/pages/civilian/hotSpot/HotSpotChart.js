import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid } from "d3-geo";

import geoUrl from "../../../assets/POA_2016_AUST.json";
//import { GiConsoleController } from "react-icons/gi";
import geoSuburbsUrl from "../../../assets/TR_2016_AUST.json";
import { Box } from "@chakra-ui/layout";

const MapChart = ({ activeCases, setTooltipContent, height }) => {
  const colorScale = scaleLinear().domain([1, 5]).range(["#F0604C", "#850101"]);

  return (
    <Box shadow="base">
      <ComposableMap
        data-tip=""
        projectionConfig={{
          scale: 550,
          rotate: [-135, 16, 0],
        }}
        height={height}
      >
        <ZoomableGroup center={[0, 0]} maxZoom={200}>
          
          {/* map areas by post code */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const POST_CODE = parseInt(geo.properties.POA_CODE16);
                return (
                  <Geography
                    key={POST_CODE}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        `Postcode: ${POST_CODE} — ${
                          activeCases[POST_CODE] != null
                            ? activeCases[POST_CODE]
                            : 0
                        } Recent ${
                          activeCases[POST_CODE] == null ||
                          activeCases[POST_CODE] > 1
                            ? "Cases"
                            : "Case"
                        }`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill:
                          activeCases[POST_CODE] > 0
                            ? colorScale(activeCases[POST_CODE])
                            : "#D6D6DA",
                        outline: "none",
                        stroke: "#000",
                        strokeWidth: "0.005px",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

        {/* map suburb names + areas over postcode areas for better usability */}
        <Geographies geography={geoSuburbsUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <Marker coordinates={centroid}>
                  <text
                    style={{ pointerEvents: "none" }}
                    y="2"
                    fontSize={1}
                    textAnchor="middle"
                  >
                    {geo.properties.TR_NAME16}
                  </text>
                </Marker>
              );
            })
          }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
};

export default memo(MapChart);
