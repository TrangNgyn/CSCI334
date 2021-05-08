import React from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Button, VStack, Select } from "@chakra-ui/react";

export default class QRScan extends React.Component {
  componentDidMount() {
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

          const sourceSelectPanel = document.getElementById(
            "sourceSelectPanel"
          );
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
                /***use this to check in***/
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

        // document.getElementById("resetButton").addEventListener("click", () => {
        //   codeReader.reset();
        //   console.log("Reset.");
        // });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
        <video id="video" height="300px"></video>
    );
  }
}
