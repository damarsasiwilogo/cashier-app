import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
  chakra,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import Logo from "../images/Kiefcie-removebg.png";
import { PasswordField } from "../components/ResetConfirmPassField";
import api from "../api";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { login } from "../slices/userSlice";
import { Field, Form, Formik } from "formik";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const CFaLock = chakra(FaLock);

function ResetPass() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { uniqueCode } = useParams();

  //connect db.json when registered user submit on login modal
  const handleSubmitPass = (values, forms) => {
    api
      .post(`/auth/reset-password`, {
        token: uniqueCode,
        newPassword: values.newPassword,
        newConfirmpassword: values.newConfirmpassword,
      })
      .then((res) => {
        const { data } = res;
        const userProfile = data.data.profile;
        const token = data.data.token;
        dispatch(login(userProfile));
        localStorage.setItem("token", token);

        toast({
          status: "success",
          title: "Reset Password is success",
          isClosable: true,
          duration: 2000,
          onCloseComplete: () => {
            forms.resetForm();
            navigate("/login");
          },
        });
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Reset Password is failed",
          description: err.response.data.message,
          isClosable: true,
          duration: 2000,
        });
      });
  };

  const resetSchema = yup.object().shape({
    newPassword: yup.string().required("Password cant be empty"),
    newConfirmpassword: yup
      .string()
      .required("Password cant be empty")
      .oneOf([yup.ref("newPassword")], "Password doesn't match"),
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
        <Stack>
          <Image alignSelf="center" src={Logo} boxSize="300px" />
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
            }}
            my={1}>
            <Stack spacing="6">
              <Heading
                alignSelf="center"
                size={{
                  base: "sm",
                  md: "md",
                }}>
                Input Your New Password
              </Heading>
              <Formik
                initialValues={{ newPassword: "", newConfirmpassword: "" }}
                validationSchema={resetSchema}
                onSubmit={handleSubmitPass}>
                {({ isSubmitting }) => (
                  <Form>
                    <Stack spacing="5" mb="2">
                      <Field name="newPassword">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.newPassword &&
                              form.touched.newPassword
                            }
                            isDisabled={isSubmitting}>
                            <FormLabel>New Password</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<CFaLock color="gray.300" />}
                              />
                              <Input
                                type={isOpen ? "text" : "password"}
                                placeholder="New Password"
                                required
                                {...field}
                              />
                              <InputRightElement>
                                <IconButton
                                  variant="ghost"
                                  aria-label={
                                    isOpen ? "Mask password" : "Reveal password"
                                  }
                                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                  onClick={() => {
                                    setIsOpen((open) => !open);
                                  }}
                                />
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.newPassword}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="newConfirmpassword">
                        {({ field, form }) => (
                          <PasswordField
                            field={field}
                            form={form}
                            isSubmitting={isSubmitting}
                          />
                        )}
                      </Field>
                    </Stack>
                    <Stack spacing="6">
                      <Button
                        loadingText="Resetting Password"
                        type="submit"
                        colorScheme="red"
                        isLoading={isSubmitting}>
                        Reset Password
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

export default ResetPass;
