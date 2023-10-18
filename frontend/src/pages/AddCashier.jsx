import {
  Container,
  Text,
  FormControl,
  Input,
  Stack,
  FormErrorMessage,
  Button,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import { PasswordField } from "../components/PasswordField";
import SidebarWithHeader from "../components/sidebar";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import api from "../api";

function AddCashierPage() {
  const toast = useToast();

  const handleCashier = (values, forms) => {
    // Append the fields to the FormData object

    const input = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    api
      .post(`/cashier`, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast({
          status: "success",
          title: "Create cashier is success",
          isClosable: true,
          duration: 1000,
        });

        console.log(res.data);

        forms.resetForm();
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

  const cashierSchema = yup.object().shape({
    username: yup.string().required("Username can't be empty"),
    password: yup.string().required("Password can't be empty"),
    email: yup.string().required("Email can't be empty"),
    firstName: yup.string().required("First Name can't be empty"),
    lastName: yup.string().required("Last Name can't be empty"),
  });
  return (
    <SidebarWithHeader>
      <Container>
        <Stack spacing="24px" textAlign="center">
          <Text fontSize="36px">Add Cashier</Text>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              firstName: "",
              lastName: "",
            }}
            validationSchema={cashierSchema}
            onSubmit={(values, forms) => handleCashier(values, forms)}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Stack spacing="5" mb="2">
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>Username</FormLabel>
                        <Input
                          type="text"
                          placeholder="Username"
                          value={values.username}
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <PasswordField
                        field={field}
                        form={form}
                        isSubmitting={isSubmitting}
                        value={values.password}
                      />
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>email</FormLabel>
                        <Input
                          type="text"
                          placeholder="Email"
                          value={values.email}
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>firstName</FormLabel>
                        <Input
                          type="text"
                          placeholder="First Name"
                          value={values.firstName}
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>lastName</FormLabel>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          value={values.lastName}
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <Stack spacing="6">
                  <Button loadingText="Loading" type="submit" colorScheme="red">
                    Register
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </SidebarWithHeader>
  );
}
export default AddCashierPage;
