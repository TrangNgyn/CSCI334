import { AccordionButton } from "@chakra-ui/accordion";
import { Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

export default function AccordButton({ title, isExpanded }) {
  return (
    <AccordionButton
      layerStyle="accordButton"
      _expanded={{ bg: "#fefefe" }}
      _hover={{ opacity: 1 }}
    >
      <Text fontSize="2xl" fontWeight="bold" my="3">
        {title}
      </Text>
      <Spacer />
      {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
    </AccordionButton>
  );
}
