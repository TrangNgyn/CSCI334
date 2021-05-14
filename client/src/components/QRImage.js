import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

export default function QRImage({ src }) {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded && imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    <Center minH="300px">
      <Spinner />
    </Center>;
  }
  return (
    <Image
      ref={imageRef}
      src={src}
      alt="The QR code of the organisation"
      w="90%"
      maxW="250px"
      onLoad={() => {
        setIsLoaded(true);
      }}
    />
  );
}
