import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import LogoIcon from "./LogoIcon";

export default function LogoMenu({ menuItems }) {
  return (
    <Menu>
      <MenuButton
        bg="inherit"
        border="none"
        position="relative"
        borderRadius="full"
        p="0"
        m="0"
        _hover={{ bottom: "3px", cursor: "pointer" }}
      >
        <LogoIcon />
      </MenuButton>
      <MenuList bg="white" shadow="lg">
        {menuItems.map((item) => (
          <MenuItem
            bg="white"
            border="none"
            key={item.title}
            onClick={() => console.log(item.path)}
          >
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
