import React from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export default function RolloutInfo({ rolloutPanel }) {
  if (rolloutPanel == 0) {
    return (
      <>
        <p>You're eligible for Phase 1a if you're any of the following:</p>
        <p>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Quarantine and border workers
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Frontline health care worker sub-groups for prioritisation
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Aged care and disability care staff
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Aged care and disability care residents
            </ListItem>
          </List>
        </p>
        <p>Planned rollout date: Currently Ongoing</p>
      </>
    );
  }

  if (rolloutPanel == 1) {
    return (
      <>
        <p>You're eligible for Phase 1b if you're any of the following:</p>
        <p>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Healthcare workers currently employed and not included in Phase 1a
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Household contacts of quarantine and border workers
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Critical and high risk workers who are currently employed
              including defence, police, fire, emergency services and meat
              processing
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Essential outbound travellers with a travel exemption
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Elderly people aged 70 years and over
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Aboriginal and Torres Strait Islander people aged 50 years and
              over
            </ListItem>
          </List>
        </p>
        <p>Planned rollout date: Currently Ongoing</p>
      </>
    );
  }

  if (rolloutPanel == 2) {
    return (
      <>
        <p>You're eligible for Phase 2a if you're any of the following:</p>
        <p>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              People aged 50 years and over
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Aboriginal and Torres Strait Islander people aged 16-49 years
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Other critical and high risk workers
            </ListItem>
          </List>
        </p>
        <p>Planned rollout date: 3 May 2021</p>
      </>
    );
  }

  if (rolloutPanel == 3) {
    return (
      <>
        <p>You're eligible for Phase 2b if you're any of the following:</p>
        <p>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              People aged 16-49 years
            </ListItem>
          </List>
        </p>
        <p>Planned rollout date: Unknown</p>
      </>
    );
  }

  if (rolloutPanel == 4) {
    return (
      <>
        <p>You're eligible for Phase 3 if you're any of the following:</p>
        <p>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              People aged less than 16 years if under
            </ListItem>
          </List>
        </p>
        <p>Planned rollout date: Unknown</p>
      </>
    );
  }
}
