import React, { useEffect, useRef, useState } from "react";
import { Image, Center, Spinner } from "@chakra-ui/react";

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
      maxW="400px"
      onLoad={() => {
        setIsLoaded(true);
      }}
    />
  );
}
