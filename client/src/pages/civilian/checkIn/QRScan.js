import React from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Button, Box, Select } from "@chakra-ui/react";

export default function QRScan() {
  let selectedDeviceId;
  const codeReader = new BrowserMultiFormatReader();
  console.log("ZXing code reader initialized");
  codeReader
    .listVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById("sourceSelect");
      selectedDeviceId = videoInputDevices[0].deviceId;
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement("option");
          sourceOption.text = element.label;
          sourceOption.value = element.deviceId;
          sourceSelect.appendChild(sourceOption);
        });

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById("sourceSelectPanel");
        sourceSelectPanel.style.display = "block";
      }

      document.getElementById("startButton").addEventListener("click", () => {
        console.log("start");
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "video",
          (result, err) => {
            if (result) {
              console.log(result);
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
            }
          }
        );
        console.log(
          `Started continous decode from camera with id ${selectedDeviceId}`
        );
      });

      document.getElementById("resetButton").addEventListener("click", () => {
        codeReader.reset();
        console.log("Reset.");
      });
    })
    .catch((err) => {
      console.error(err);
    });

  return (
    <Box>
      <video id="video" width="300" height="200"></video>
      <Button id="startButton">START</Button>
      <Button id="resetButton">RESET</Button>
      <div id="sourceSelectPanel">
        <label for="sourceSelect">Change video source:</label>
        <Select id="sourceSelect">
        </Select>
      </div>

    </Box>
  );
}
