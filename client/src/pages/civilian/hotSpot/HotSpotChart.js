import React, { memo, useState } from "react";
import { Box } from "@chakra-ui/layout";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

import geoUrl from "../../../assets/POA_2016_AUST.json";

// const geoUrl =
//   "http://localhost:3000/static/POA_2016_AUST_GEO.json";

const MapChart = ({ activeCases, setTooltipContent }) => {

  console.log(activeCases);

  const colorScale = scaleLinear()
  .domain([1, 5])
  .range(["#F0604C", "#850101"]);

  return (
    <>
      <ComposableMap data-tip="" 
        projectionConfig={{ 
          scale: 550,
          rotate: [-135, 16, 0],
        }}>
        <ZoomableGroup >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const POST_CODE = parseInt(geo.properties.POA_CODE16);
                return (
                  <Geography
                    key={POST_CODE}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(`${POST_CODE} — ${activeCases[POST_CODE] != null ? activeCases[POST_CODE] : 0}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: activeCases[POST_CODE] > 0 ? colorScale(activeCases[POST_CODE]) : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
