import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { UserStore } from "../../../stores/UserStore";
import { Box } from "@chakra-ui/layout";

export default function QRScan() {
  const codeReader = new BrowserMultiFormatReader();
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const userStore = UserStore;

  useEffect(() => {
    console.log("ZXing code reader initialized");
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const sourceSelect = document.getElementById("sourceSelect");
          setSelectedDeviceId(videoInputDevices[0].deviceId);
          if (videoInputDevices.length >= 1) {
            videoInputDevices.forEach((element) => {
              const sourceOption = document.createElement("option");
              sourceOption.text = element.label;
              sourceOption.value = element.deviceId;
              sourceSelect.appendChild(sourceOption);
            });

            sourceSelect.onchange = () => {
              setSelectedDeviceId(sourceSelect.value);
            };

            const sourceSelectPanel =
              document.getElementById("sourceSelectPanel");
            sourceSelectPanel.style.display = "block";
          }

      codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length > 0) {
            const sourceSelect = document.getElementById("sourceSelect");
            setSelectedDeviceId(videoInputDevices[0].deviceId);
            if (videoInputDevices.length >= 1) {
              videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement("option");
                sourceOption.text = element.label;
                sourceOption.value = element.deviceId;
                sourceSelect.appendChild(sourceOption);
              });
  
              sourceSelect.onchange = () => {
                setSelectedDeviceId(sourceSelect.value);
              };
  
              const sourceSelectPanel =
                document.getElementById("sourceSelectPanel");
              sourceSelectPanel.style.display = "block";
            }
  
            document
              .getElementById("startButton")
              .addEventListener("click", () => {
                codeReader.decodeFromVideoDevice(
                  selectedDeviceId,
                  "video",
                  (result, err) => {
                    if (result) {
                      userStore.setProperty("business_id", result);
                      userStore.setProperty("scanned", true);
                      codeReader.reset();
                    }
                    if (err && !(err instanceof NotFoundException)) {
                      console.error(err);
                    }
                  }
                );
              });
  
            document.getElementById("back").addEventListener("click", () => {
              codeReader.reset();
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Box h="50vh">
      <video id="video" />
    </Box>
  );
}
