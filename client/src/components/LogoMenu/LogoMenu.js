import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import LogoIcon from "./LogoIcon";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../../stores/UserStore";

export default function LogoMenu({ menuItems }) {
  let navigate = useNavigate();
  const userStore = UserStore;

  const handleLogout = () => {
    userStore.doLogout();
    navigate("/");
  };

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
            onClick={() => navigate(item.path)}
          >
            {item.title}
          </MenuItem>
        ))}
        <MenuItem
          bg="white"
          border="none"
          key={"logout"}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
