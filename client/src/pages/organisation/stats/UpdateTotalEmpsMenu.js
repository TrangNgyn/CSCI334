import React, { useState } from "react";
import { Button, Input, Portal, Center, Text } from "@chakra-ui/react";
import { UserStore } from "../../../stores/UserStore";
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

function UpdateTotalEmpsMenu() {
  const userStore = UserStore;

  const handleUpdateTotalEmps = (e) => {
    e.preventDefault();
    userStore.updateTotalEmps();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Text variant="link">Update Total Employees</Text>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          w="90%"
          shadow="lg"
          border="2px"
          borderColor="green.500"
        >
          <PopoverArrow
            borderTop="1px"
            borderLeft="1px"
            borderColor="green.500"
          />
          <PopoverHeader>Total Current Employees</PopoverHeader>
          <PopoverCloseButton bg="none" border="none" boxSize="8" />
          <PopoverBody w="220px" pr="8">
            <form onSubmit={handleUpdateTotalEmps}>
              <Center flexDirection="column" p="3">
                <Input
                  isRequired
                  type="number"
                  w="160px"
                  name="totalEmps"
                  value={userStore.totalEmps}
                  onChange={(e) =>
                    userStore.setProperty(e.target.name, e.target.value)
                  }
                />
                <Button w="196px" variant="green" mt="4" type="submit">
                  Update
                </Button>
              </Center>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default observer(UpdateTotalEmpsMenu);
