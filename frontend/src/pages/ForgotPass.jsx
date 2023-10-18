import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
  chakra,
  Text,
} from "@chakra-ui/react";
import Logo from "../images/Kiefcie-removebg.png";
import api from "../api";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { login } from "../slices/userSlice";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetSubmit = async (values, actions) => {
    try {
      const response = await api.post("/auth/forgot-password", values);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        duration: 2000,
        onCloseComplete: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const inputemailSchema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email format")
      .required("Email can't be empty"),
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
          <Formik
            initialValues={{ email: "" }}
            validationSchema={inputemailSchema}
            onSubmit={handleResetSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  // bg={useColorModeValue('white', 'gray.700')}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={1}>
                  <Heading
                    alignSelf="center"
                    lineHeight={1.1}
                    fontSize={{ base: "md", md: "lg" }}>
                    Forgot your password?
                  </Heading>
                  <Text fontSize={{ base: "sm", sm: "md" }} alignSelf="center">
                    You&apos;ll get an email with a reset link
                  </Text>
                  <Stack mb="2">
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          id="email"
                          isInvalid={form.errors.email && form.touched.email}
                          isDisabled={isSubmitting}>
                          {/* <FormLabel
                            fontSize={{ base: "sm", sm: "md" }}
                            justifyContent="center">
                            You&apos;ll get an email with a reset link
                          </FormLabel> */}
                          <Input
                            placeholder="your-email@example.com"
                            type="email"
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack spacing={6}>
                    <Button
                      loadingText="Sending email"
                      type="submit"
                      colorScheme="red"
                      isLoading={isSubmitting}>
                      Request Reset
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </div>
  );
}

export default ForgotPass;
