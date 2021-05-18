import React from "react";
import { Button, Input, Portal, Center } from "@chakra-ui/react";
import { UserStore } from "../../../stores/UserStore";
import Icon from "@chakra-ui/icon";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { observer } from "mobx-react";

function AddDepMenu() {
  const userStore = UserStore;

  const addDep = (e) => {
    e.preventDefault();
    userStore.addDependant();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          w="34"
          variant="gray"
          rightIcon={<Icon as={HiOutlinePlusCircle} boxSize="6" />}
        >
          Add
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          w="90%"
          shadow="lg"
          border="2px"
          borderColor="green.500"
        >
          <PopoverArrow
            borderBottom="2px"
            borderRight="2px"
            borderColor="green.500"
          />
          <PopoverHeader>Dependant Name</PopoverHeader>
          <PopoverCloseButton bg="none" border="none" boxSize="8" />
          <PopoverBody w="240px">
            <Center flexDirection="column" p="3">
              <form onSubmit={addDep}>
                <Input
                  isRequired
                  w="160px"
                  name="newDependant"
                  value={userStore.newDependant}
                  onChange={(e) =>
                    userStore.setProperty(e.target.name, e.target.value)
                  }
                />
                <Button type="submit" w="196px" variant="green" mt="4">
                  Add
                </Button>
              </form>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default observer(AddDepMenu);
