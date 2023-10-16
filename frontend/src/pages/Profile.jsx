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
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export default function UserProfileEdit() {
  const baseURL = "localhost:8000";
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

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
          setUser(response.data.data);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error?.response?.status == 403) {
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
      if (values.photoProfile) data.append("photoProfile", values.photoProfile);
      data.append("password", values.password);

      const response = await api.patch(`/auth/account/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.ok) {
        // setSelectedFileName("");
        toast({
          title: "Profile Updated",
          description: "Your Profile is Updated",
          status: "success",
          duration: 1000,
          isClosable: true,
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
          duration: "1000",
          isClosable: "true",
        });
      }
    }
    // api
    //   .patch(`/auth/account`, {
    //     identity: values.username,
    //     password: values.password,
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     const userProfile = data.data.profile;
    //     const token = data.data.token;
    //     localStorage.setItem("token", token);

    //     toast({
    //       status: "success",
    //       title: "Login is success",
    //       isClosable: true,
    //       duration: 1000,
    //       onCloseComplete: () => {
    //         forms.resetForm();
    //         navigate("/");
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       status: "error",
    //       title: "Something wrong",
    //       description: error.message,
    //       isClosable: true,
    //       duration: 5000,
    //     });
    //     forms.resetForm();
    //   });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: handleUpdate,
  });

  const editSchema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
    confirmpassword: yup.string().oneOf([yup.ref("password"), ""]),
    email: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
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
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <FormControl id="username">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src={
                    user
                      ? `http://${baseURL}/static/${user.photoProfile}`
                      : "https://www.adebayosegun.com/_next/image?url=%2Fstatic%2Fimages%2Fsegun-adebayo-headshot.jpg&w=3840&q=75"
                  }>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Photo Profile</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>User Name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="username"
              onChange={formik.handleUpdate}
              value={formik.values.username}
            />
          </FormControl>
          <FormControl id="Password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Password"
                _placeholder={{ color: "gray.500" }}
                type={isOpen ? "text" : "password"}
                name="password"
                onchange={formik.handleUpdate}
                value={formik.values.password}
              />
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
          <FormControl id="ConfirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Confirm Password"
                _placeholder={{ color: "gray.500" }}
                type={isOpen ? "text" : "password"}
                name="confirmpassword"
                onchange={formik.handleUpdate}
                value={formik.values.password}
              />
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
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}>
              Submit
            </Button>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </SidebarWithHeader>
  );
}
