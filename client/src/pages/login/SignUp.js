import { Button } from "@chakra-ui/button";
import { Center, Text, VStack } from "@chakra-ui/layout";
import { Select, Input, Spacer, Stack, InputGroup } from "@chakra-ui/react";
import React from "react";
import { observer } from "mobx-react";
import DotPattern from "../../components/DotPattern";
import LocationSearchInput from '../../components/GoogleMapsAutoComplete';
import ChakraToastStatus from '../../components/ChakraToastStatus';

const accTypes = [
  { name: "Civilian", id: "civilian" },
  { name: "Business", id: "business" },
];

const SignUp = ({ userStore, setSignUp }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    userStore.doSignUp();
    //setSignUp(false);
  };

  return (
    <Center h="100vh" layerStyle="mainBG">
      <DotPattern />
            
      {/* display error message returned by API if one is returned, currently disabled, few bugs */}
      {/* userStore.errorMSG.length > 0 && <ChakraToastStatus status={'error'} message={userStore.errorMSG} /> */}

      <Stack spacing="10" mx="auto" maxW="lg" w="90%">
        <Stack align="center"></Stack>
        <form onSubmit={handleSignUp}>
          <Stack spacing={4} bg="white" rounded="lg" p={8} boxShadow="lg">
            <Text as="h2" mt={0}>
              Sign Up
            </Text>
            <Select
              name="accType"
              variant="filled"
              onChange={(e) =>
                userStore.setProperty(e.target.name, e.target.value)
              }
              bg="#efefef"
            >
              {accTypes.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
            <InputGroup size="md">
              <Input
                isRequired
                name="email"
                placeholder="Email"
                value={userStore.email}
                onChange={(e) =>
                  userStore.setProperty(e.target.name, e.target.value)
                }
                variant="filled"
                bg="#efefef"
              />
            </InputGroup>
            <InputGroup size="md">
              <Input
                isRequired
                name="password"
                type="password"
                value={userStore.password}
                placeholder="Password"
                variant="filled"
                bg="#efefef"
                onChange={(e) =>
                  userStore.setProperty(e.target.name, e.target.value)
                }
              />
            </InputGroup>

            {/* Display required fields for signing up as a user */}
            {userStore.accType === 'civilian' &&
              <>
                <InputGroup size="md">
                  <Input
                    isRequired
                    name="first_name"
                    value={userStore.first_name}
                    placeholder="First Name"
                    variant="filled"
                    bg="#efefef"
                    onChange={(e) =>
                      userStore.setProperty(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
                <InputGroup size="md">
                  <Input
                    isRequired
                    name="last_name"
                    value={userStore.last_name}
                    placeholder="Last Name"
                    variant="filled"
                    bg="#efefef"
                    onChange={(e) =>
                      userStore.setProperty(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
              </>
            }

            {/* Display required fields for signing up as a business */}
            {userStore.accType === 'business' &&
              <>
                <InputGroup size="md">
                  <Input
                    isRequired
                    name="business_name"
                    value={userStore.business_name}
                    placeholder="Business Name"
                    variant="filled"
                    bg="#efefef"
                    onChange={(e) =>
                      userStore.setProperty(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
                <LocationSearchInput address={userStore.address} setProperty={userStore.setProperty} />
              </>
            }

            <VStack pt="3">
              <Text variant="link" align="center">
                Request an organisation account here
              </Text>
              <Button variant="green" borderRadius="md" type="submit">
                Sign Up
              </Button>
              <Spacer />
              <Button
                variant="gray"
                type="button"
                borderRadius="md"
                onClick={() => setSignUp(false)}
              >
                Back
              </Button>
            </VStack>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default observer(SignUp);
