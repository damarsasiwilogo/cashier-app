import {
  Box,
  Button,
  Checkbox,
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
import { PasswordField } from "./Login/PasswordField";
import api from "../api";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { login } from "../slices/userSlice";
import { Field, Form, Formik } from "formik";
import { FaUserAlt } from "react-icons/fa";
// import { OAuthButtonGroup } from "./Login/OAuthButtonGroup";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);

function Login() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //connect db.json when registered user submit on login modal
  const handleLogin = (values, forms) => {
    console.log("test");
    api
      .post(`/auth`, {
        identity: values.username,
        password: values.password,
      })
      .then((res) => {
        const { data } = res;
        const userProfile = data.data.profile;
        const token = data.data.token;
        dispatch(login(userProfile));
        localStorage.setItem("token", token);

        toast({
          status: "success",
          title: "Login is success",
          isClosable: true,
          duration: 2000,
          onCloseComplete: () => {
            forms.resetForm();
            navigate("/");
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
        <Stack>
          <Image alignSelf="center" src={Logo} boxSize="300px" />
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            // bg={useColorModeValue('white', 'gray.700')}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={1}>
            <Heading alignSelf="center" lineHeight={1.1} fontSize={{ base: "md", md: "lg" }}>
              Forgot your password?
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              // color={useColorModeValue('gray.800', 'gray.400')}
            >
              You&apos;ll get an email with a reset link
            </Text>
            <FormControl id="email">
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme="red">
                Request Reset
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;
