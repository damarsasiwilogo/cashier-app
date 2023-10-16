import {
  Container,
  Text,
  FormControl,
  Input,
  Stack,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const AddCashierPage = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("please input the username"),
      password: Yup.string().required("please input the password"),
      email: Yup.string().required("please input the email"),
      firstName: Yup.string().required("please input the first name"),
      lastName: Yup.mixed().required("please input the last name"),
    }),
    validateOnChange: false,
    onSubmit: async (value, forms) => {
      const formData = new FormData();
      formData.append("username", value.username);
      formData.append("password", value.password);
      formData.append("email", value.email);
      formData.append("firstname", value.firstName);
      formData.append("lastname", value.lastName);
      try {
        await Axios.post("http://localhost:8000/cashier", formData, {
          headers: {
            Authorization: ` {{TOKEN}}`,
          },
        });

        formik.setSubmitting(false);
      } catch (err) {
        formik.setSubmitting(false);
        console.log(err);

        toast({
          status: "error",
          title: "Something wrong",
          description: err.message,
          isClosable: true,
          duration: 3000,
        });
      }
      forms.resetForm();
    },
  });
  return (
    <SidebarWithHeader>
      <Container>
        <Stack spacing="24px" textAlign="center">
          <Text fontSize="36px">Add Cashier</Text>
          <FormControl isInvalid={formik.errors.username}>
            <Input
              placeholder="Username"
              onChange={(e) => formik.setFieldValue("username", e.target.value)}
              value={formik.values.username}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.password}>
            <Input
              placeholder="Password"
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              value={formik.values.password}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Input
              placeholder="Email"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              value={formik.values.email}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Input
              placeholder="First Name"
              onChange={(e) =>
                formik.setFieldValue("firstName", e.target.value)
              }
              value={formik.values.firstName}
            />
            <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Input
              placeholder="Last Name"
              onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
              value={formik.values.lastName}
            />
            <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Button
              type="submit"
              colorScheme="red"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </SidebarWithHeader>
  );
};
export default AddCashierPage;
