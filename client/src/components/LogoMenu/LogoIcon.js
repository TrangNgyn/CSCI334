import { Image } from "@chakra-ui/image";
import React from "react";
import LogoSVG from "../../assets/logo.svg";

export default function LogoIcon() {
  return (
    <Image
      src={LogoSVG}
      boxSize="90"
      borderRadius="full"
      alt="Trace Response Logo"
    />
  );
}
