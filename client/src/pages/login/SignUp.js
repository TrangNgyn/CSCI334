import { Center, Text, VStack } from "@chakra-ui/layout";
import { Select, Spacer, Stack, InputGroup } from "@chakra-ui/react";
import React from "react";
import { observer } from "mobx-react";
import DotPattern from "../../components/DotPattern";
import LocationSearchInput from "../../components/GoogleMapsAutoComplete";
import InputWrapper from "../../components/InputWrapper";
import ButtonWrapper from "../../components/ButtonWrapper";
import ToastStatusMessageWrapper from "../../components/ToastStatusMessageWrapper";

const accTypes = [
  { name: "Civilian", id: "civilian" },
  { name: "Business", id: "business" },
  { name: "Organisation", id: "organisation"},
];

const SignUp = ({ userStore, setSignUp }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    userStore.doSignUp();
  };

  return (
    <ToastStatusMessageWrapper>
      <Center h="100vh" layerStyle="mainBG">
        <DotPattern />

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
                disabled={userStore.isLoading}
              >
                {accTypes.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
              <InputGroup size="md">
                <InputWrapper
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
                <InputWrapper
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
              {userStore.accType === "civilian" && (
                <>
                  <InputGroup size="md">
                    <InputWrapper
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
                    <InputWrapper
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
              )}

              {/* Display required fields for signing up as a business */}
              {userStore.accType === "business" && (
                <>
                  <InputGroup size="md">
                    <InputWrapper
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
                  <LocationSearchInput
                    address={userStore.address}
                    setProperty={userStore.setProperty}
                  />
                </>
              )}

              {/* Display required fields for signing up as a organisation */}
            {userStore.accType === "organisation" && (
              <>
                <InputGroup size="md">
                  <InputWrapper
                    isRequired
                    name="organisation_name"
                    value={userStore.organisation_name}
                    placeholder="Organisation Name"
                    variant="filled"
                    bg="#efefef"
                    onChange={(e) =>
                      userStore.setProperty(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
              </>
            )}
            

              <VStack pt="3">
                <Text variant="link" align="center">
                  Request an organisation account here
                </Text>
                <ButtonWrapper variant="green" borderRadius="md" type="submit">
                  Sign Up
                </ButtonWrapper>
                <Spacer />
                <ButtonWrapper
                  variant="gray"
                  type="button"
                  borderRadius="md"
                  onClick={() => setSignUp(false)}
                >
                  Back
                </ButtonWrapper>
              </VStack>
            </Stack>
          </form>
        </Stack>
      </Center>
    </ToastStatusMessageWrapper>
  );
};

export default observer(SignUp);
