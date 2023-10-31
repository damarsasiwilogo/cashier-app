import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  Text,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "../components/sidebar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export default function UserProfileEdit() {
  const baseURL = "localhost:8000";
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedProfile = localStorage.getItem("profile");
        const userId = storedProfile ? JSON.parse(storedProfile).id : null;

        // If userId is not available, log an error and return to prevent API call
        if (!userId) {
          console.error("User ID not available");
          return;
        }

        const response = await api.get(`/auth/account/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.ok) {
          const userDatas = response.data.data;
          setUserData(userDatas);
          formik.setValues({
            username: userDatas.username,
            email: userDatas.email,
            firstName: userDatas.firstName,
            lastName: userDatas.lastName,
          });
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error?.response?.status === 403) {
          toast({
            title: "Error fetching user data",
            description: "Please login to continue",
            status: "error",
            duration: 1000,
            isCloseable: true,
            onCloseComplete() {
              navigate("/login");
            },
          });
        } else {
          toast({
            title: "Network Error.",
            description: String(error),
            status: "error",
            isCloseable: true,
            duration: 1000,
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (values) => {
    try {
      const data = new FormData();
      data.append("username", values.username);
      data.append("email", values.email);
      data.append("firstName", values.firstName);
      data.append("lastName", values.lastName);
      if (values.photoProfile) data.append("file", values.photoProfile);
      if (values.password) {
        data.append("password", values.password);
      }

      const response = await api.patch(`/auth/account/cashier`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.ok) {
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        toast({
          title: "Profile Updated",
          description: "Your Profile is Updated",
          status: "success",
          duration: 1000,
          isClosable: true,
          onCloseComplete() {
            navigate("/");
          },
        });
      } else {
        toast({
          title: "Error Updating Profile",
          description: "Error updating your Profile",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast({
          title: "Error",
          description: error.response?.data?.error,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An Error occured, please try again",
          status: "error",
          duration: "3000",
          isClosable: "true",
        });
      }
    }
  };

  const editSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup
      .string()
      .optional()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmpassword: yup
      .string()
      .optional()
      .oneOf([yup.ref("password"), ""], "Password don't match"),
    email: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      lastName: "",
      firstName: "",
      email: "",
      photoProfile: null,
    },
    editSchema,
    onSubmit: handleUpdate,
  });

  return (
    <SidebarWithHeader>
      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="photoProfile">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    src={
                      userData
                        ? `http://${baseURL}/static/${userData.photoProfile}`
                        : "https://www.adebayosegun.com/_next/image?url=%2Fstatic%2Fimages%2Fsegun-adebayo-headshot.jpg&w=3840&q=75"
                    }
                  >
                    {/* <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      /> */}
                  </Avatar>
                </Center>
                <Center w="full">
                  <label htmlFor="inputImage">
                    <Button w="full" as="span">
                      Change Profile Picture
                    </Button>
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="inputImage"
                    name="inputImage"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        formik.setFieldValue("photoProfile", e.target.files[0]);
                      }
                    }}
                  />
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="username">
              <FormLabel>User Name</FormLabel>
              <Input
                placeholder="UserName"
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <Text color="red.500">
                {formik.touched.username ? formik.errors.username : ""}
              </Text>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type={isOpen ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  ref={passwordRef}
                />
                <Text color="red.500">
                  {formik.touched.password ? formik.errors.password : ""}
                </Text>
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={() => {
                      setIsOpen((open) => !open);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="ConfirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Confirm Password"
                  type={isOpen ? "text" : "password"}
                  name="confirmpassword"
                  onchange={formik.handleChange}
                  value={formik.values.confirmpassword}
                  ref={confirmPasswordRef}
                />
                <Text color="red.500">
                  {formik.touched.confirmpassword
                    ? formik.errors.confirmpassword
                    : ""}
                </Text>
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={() => {
                      setIsOpen((open) => !open);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Text color="red.500">
                {formik.touched.email ? formik.errors.email : ""}
              </Text>
            </FormControl>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <Text color="red.500">
                {formik.touched.firstName ? formik.errors.firstName : ""}
              </Text>
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <Text color="red.500">
                {formik.touched.lastName ? formik.errors.lastName : ""}
              </Text>
            </FormControl>
            <Flex mt="5" spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Stack>
      </Flex>
    </SidebarWithHeader>
  );
}
