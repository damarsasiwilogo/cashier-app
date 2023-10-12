import {
  Container,
  FormControl,
  Input,
  Stack,
  Text,
  Switch,
  FormLabel,
  Select,
  Button,
  Box,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import SidebarWithHeader from "../components/sidebar";

const AddProductPage = () => {
  const toast = useToast();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Menggunakan useState untuk memperbarui state uploadedFiles
      setUploadedFiles(acceptedFiles);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      isActive: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("please input the Product Name"),
      price: Yup.string().required("please input the Product Price"),
      category: Yup.string().required("please input the Product Category"),
      description: Yup.string().required(
        "please input the Product Description"
      ),
      // image: Yup.mixed().required("please input the Product Image"),
    }),
    validateOnChange: false,
    onSubmit: async (value, forms) => {
      const formData = new FormData();
      formData.append("nama", value.name);
      formData.append("price", value.price);
      formData.append("category", value.category);
      formData.append("description", value.description);
      //ngepost ke database
      // const input = {
      //   name: value.name,
      //   price: value.price,
      //   category: value.category,
      //   description: value.description,
      //   image: value.image,
      // };

      try {
        await Axios.post("http://localhost:8000/product/create", formData);

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
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <Container>
          <Stack spacing="24px" textAlign="center">
            <Text fontSize="36px">Create Product</Text>
            <FormControl isInvalid={formik.errors.name}>
              <Input
                placeholder="Name Product"
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                value={formik.values.name}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.price}>
              <Input
                placeholder="Price"
                onChange={(e) => formik.setFieldValue("price", e.target.value)}
                value={formik.values.price}
              />
              <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.category}>
              <Select
                placeholder="Category"
                onChange={(e) =>
                  formik.setFieldValue("category", e.target.value)
                }
                value={formik.values.category}
              >
                <option value="option1">Option 1</option>
                <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
              </Select>
            </FormControl>
            <FormControl isInvalid={formik.errors.category}>
              <Input
                placeholder="Description"
                onChange={(e) =>
                  formik.setFieldValue("description", e.target.value)
                }
                value={formik.values.description}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.image}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <div
                {...getRootProps()}
                className="dropzone"
                style={{
                  border: "2px dashes black",
                  borderRadius: "4px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
              <Box display="flex">
                <FormLabel htmlFor="active" mb="0">
                  Active
                </FormLabel>
                <Switch id="active" />
              </Box>
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
      </form>
    </SidebarWithHeader>
  );
};
export default AddProductPage;
