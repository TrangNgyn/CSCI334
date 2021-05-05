import { Image } from "@chakra-ui/image";
import React from "react";
import Dots from "../assets/dots.svg";

export default function DotPattern() {
  return (
    <Image
      position="absolute"
      top="0"
      right="0"
      src={Dots}
      h={{ base: "160", md: "240", xl: "400" }}
      alt="White Doots"
    />
  );
}
