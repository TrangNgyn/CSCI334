import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid } from "d3-geo";

import geoUrl from "../../../assets/POA_2016_AUST.json";
//import { GiConsoleController } from "react-icons/gi";
import geoSuburbsUrl from "../../../assets/TR_2016_AUST.json";

const MapChart = ({ activeCases, setTooltipContent }) => {

  const colorScale = scaleLinear()
  .domain([1, 5])
  .range(["#F0604C", "#850101"]);

  return (
    <ComposableMap data-tip="" 
      projectionConfig={{ 
        scale: 550,
        rotate: [-135, 16, 0],
      }}
      height={350}>
      <ZoomableGroup center={[0,0]} maxZoom={200} >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const POST_CODE = parseInt(geo.properties.POA_CODE16);
              return (
                <>
                  <Geography
                    key={POST_CODE}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(`Postcode: ${POST_CODE} — ${activeCases[POST_CODE] != null ? activeCases[POST_CODE] : 0} Recent ${activeCases[POST_CODE] == null || activeCases[POST_CODE] > 1 ? 'Cases' : 'Case' }`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: activeCases[POST_CODE] > 0 ? colorScale(activeCases[POST_CODE]) : "#D6D6DA",
                        outline: "none",
                        stroke: "#000",
                        strokeWidth: "0.005px",
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
                </>
              );
            })
          }
        </Geographies>

        <Geographies geography={geoSuburbsUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <>
                  <Marker coordinates={centroid}>
                    <text style={{pointerEvents: "none"}} y="2" fontSize={1} textAnchor="middle">
                      {geo.properties.TR_NAME16}
                    </text>
                  </Marker>
                </>
              );
            })
          }
          </Geographies>
          
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(MapChart);

{/* <Geographies geography={geoSuburbsUrl}>
  {({ geographies }) =>
    geographies.map(geo => {
      console.log(geo.properties.SED_NAME16)
      const centroid = geoCentroid(geo);
      return (
        <>
          <Geography
            key={geo.rsmKey}
            geography={geo}
            style={{
              default: {
                outline: "none",
                fillOpacity: 0.0
              },
              hover: {
                fillOpacity: 0.0,
                outline: "none"
              },
              pressed: {
                fillOpacity: 0.0,
                outline: "none"
              }
            }}
          />
          <Marker coordinates={centroid}>
            <text y="2" fontSize={0.05} textAnchor="middle">
              {geo.properties.SED_NAME16}
            </text>
          </Marker>
        </>
      );
    })
  }
  </Geographies> */}


  

  // {activeCases[POST_CODE] != null ? 
  //   <Annotation
  //     subject={centroid}
  //     connectorProps={{
  //       stroke: "#FF5533",
  //       strokeWidth: 0.05,
  //       strokeLinecap: "round"
  //     }}
  //   >
  //     <text fontSize={1} x="1" y="1" textAnchor="end" fill="#F53" size={0.5}>
  //       {"Paris"}
  //     </text>
  //   </Annotation>
  //   :
  //   null
  // }

  {/* <Annotation
    subject={centroid}
    dx={offsets[cur.id][0]}
    dy={offsets[cur.id][1]}
  >
    <text x={4} fontSize={14} alignmentBaseline="middle">
      {cur.id}
    </text>
  </Annotation> */}
