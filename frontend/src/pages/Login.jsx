import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
  useToast,
  chakra,
} from "@chakra-ui/react";
import Logo from "../images/Kiefcie-removebg.png";
import { PasswordField } from "./Login/PasswordField";
import { addPointerInfo } from "framer-motion";
import api from "../api";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as yup from "yup";
import { login } from "../slices/userSlice";
import { Field, Form, Formik } from "formik";
import { FaUserAlt } from "react-icons/fa";
// import { OAuthButtonGroup } from "./Login/OAuthButtonGroup";
const CFaUserAlt = chakra(FaUserAlt);

function Login() {
  const toast = useToast();
  const dispatch = useDispatch();

  //connect db.json when registered user submit on login modal
  const handleLogin = (values, forms) => {
    api
      .get(`/auth?q=${values.username}`)
      .then((res) => {
        const { data } = res;
        const filteredUser = data
          .filter((user) => {
            return user.username === values.username;
          })
          .filter((user) => user.password === values.password);
        if (filteredUser.length === 0) {
          toast({
            status: "error",
            title: "Login failed",
            description: "incorrect username or password",
            isClosable: true,
            duration: 5000,
          });
          forms.setSubmitting(false);
          return;
        }
        const [userProfile] = filteredUser;
        dispatch(login(userProfile));

        toast({
          status: "success",
          title: "Login is success",
          isClosable: true,
          duration: 1000,
          onCloseComplete: () => {
            forms.resetForm();
          },
        });
      })
      .catch((error) => {
        toast({
          status: "error",
          title: "Something wrong",
          description: error.message,
          isClosable: true,
          duration: 5000,
        });
        forms.resetForm();
      });
  };

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username cant be empty"),
    password: yup.string().required("Password cant be empty"),
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Container
        maxW="lg"
        py={{
          base: "12",
          md: "24",
        }}
        px={{
          base: "0",
          sm: "8",
        }}>
        <Stack spacing="8">
          <Stack
            spacing="6"
            alignItems="center">
            <Image
              src={Logo}
              boxSize="300px"
            />
            <Stack
              spacing={{
                base: "2",
                md: "3",
              }}
              textAlign="center">
              <Heading
                size={{
                  base: "xs",
                  md: "sm",
                }}>
                Log in to your account
              </Heading>
            </Stack>
          </Stack>
          <Box
            py={{
              base: "0",
              sm: "8",
            }}
            px={{
              base: "4",
              sm: "10",
            }}
            bg={{
              base: "transparent",
              sm: "bg.surface",
            }}
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{
              base: "none",
              sm: "xl",
            }}>
            <Stack spacing="6">
              <Formik
                initialValues={{ username: "" }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}>
                {({ isSubmitting }) => (
                  <Form>
                    <Stack
                      spacing="5"
                      mb="2">
                      <Field name="username">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.username && form.touched.username
                            }
                            isDisabled={isSubmitting}>
                            <FormLabel>Username</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                              />
                              <Input
                                type="text"
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.username}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <PasswordField />
                    </Stack>
                    <HStack
                      justify="space-between"
                      mb="2">
                      <Checkbox
                        defaultChecked
                        colorScheme="red">
                        Remember me
                      </Checkbox>
                      <Button
                        variant="text"
                        size="sm">
                        Forgot password?
                      </Button>
                    </HStack>
                    <Stack spacing="6">
                      <Button
                        loadingText="Signing In"
                        type="submit"
                        colorScheme="red">
                        Sign in
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;
