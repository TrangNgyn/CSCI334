import {
    Flex,
    Menu,
    MenuButton,
    Button,
    Image,
    MenuList,
    MenuItem,
    MenuDivider,
  } from "@chakra-ui/react";
  import React from "react";
  
  const Menu = ({ handleLogout }) => {
    return (
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            bg="white"
          >
            <Image borderRadius="full" src="" alt="Trace Response Logo" />
          </MenuButton>
          <MenuList>
            <MenuItem border={0} bg="white">Your Profile</MenuItem>
            <MenuDivider />
            <MenuItem border={0} bg="white" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };
  
  export default Menu;