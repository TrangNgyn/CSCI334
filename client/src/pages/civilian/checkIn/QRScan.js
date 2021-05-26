import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { UserStore } from "../../../stores/UserStore";
import { Box } from "@chakra-ui/layout";

export default function QRScan() {
  const codeReader = new BrowserMultiFormatReader();
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const userStore = UserStore;

  // get the users available video sources on component mount and display them in the dropdown menu
  useEffect(() => {
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const sourceSelect = document.getElementById("sourceSelect");
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
            document.getElementById("back").addEventListener("click", () => {
              codeReader.reset();
              codeReader.stopContinuousDecode();
            });
          }
        })
        .catch((err) => {
          userStore.setProperty("errorMSG", err);
        });
        userStore.setProperty("errorMSG", "")
      }, []);

      // when selected device is initially selected/updated show the video source for scanning the QR code
      useEffect(() => {
        if(selectedDeviceId.length > 0) {
          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            "video",
            (result, err) => {
              if (result) {
                userStore.setProperty("business_id", result);
                userStore.setProperty("scanned", true);
                console.log(result);
                codeReader.reset();
                codeReader.stopContinuousDecode();
              }
              if (err && !(err instanceof NotFoundException)) {
                userStore.setProperty("errorMSG", err);
              }
            }
          );
        }
        codeReader.stopContinuousDecode();
      }, [selectedDeviceId]);

  return (
    <Box h="50vh">
      <video id="video" />
    </Box>
  );
}
