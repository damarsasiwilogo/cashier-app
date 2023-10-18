import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Stack,
  Text,
  Input,
  Select,
  Textarea,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import api from "../api";

function MyComponent({ isOpen, onClose, productDetail }) {
  const toast = useToast();
  const [categories, setCategories] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      formik.setFieldValue("image", acceptedFiles[0]);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("please input the Product Name"),
      price: Yup.string().required("please input the Product Price"),
      category: Yup.string().required("please input the Product Category"),
      description: Yup.string().required(
        "please input the Product Description"
      ),
      image: Yup.mixed().required("please input the Product Image"),
    }),
    validateOnChange: false,
    onSubmit: async (value, forms) => {
      const formData = new FormData();

      console.log("test");

      //   const input = {
      //     name: value.name,
      //     price: value.price,
      //     categoryId: value.category,
      //     description: value.description,
      //     image: value.image,
      //   };

      formData.append("name", value.name);
      formData.append("price", value.price);
      formData.append("categoryId", value.category);
      formData.append("description", value.description);
      formData.append("image", value.image);

      try {
        await api.patch(`/product/${productDetail?.id}`, formData);
        formik.setSubmitting(false);
        toast({
          status: "success",
          title: "Update Product Success",
          isClosable: true,
          duration: 3000,
        });
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
  const fetchCategories = async () => {
    try {
      const response = await api.get("/product/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error("Gak bisa bro:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalBody>
              <Box>
                <Stack spacing="24px" textAlign="left">
                  <FormControl isInvalid={formik.errors.name}>
                    <Box spacing="15px">
                      <Text fontsize="24px">Nama Product</Text>
                      <Input
                        onChange={(e) =>
                          formik.setFieldValue("name", e.target.value)
                        }
                        placeholder={productDetail?.name}
                        value={formik.values.name}
                      ></Input>
                    </Box>
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.price}>
                    <Box spacing="15px">
                      <Text fontsize="24px">Price</Text>
                      <Input
                        onChange={(e) =>
                          formik.setFieldValue("price", e.target.value)
                        }
                        placeholder={productDetail?.price}
                        value={formik.values.price}
                      ></Input>
                    </Box>
                    <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.category}>
                    <Box spacing="15px">
                      <Text fontsize="24px">Category</Text>
                      <Select
                        placeholder="Category"
                        onChange={(e) =>
                          formik.setFieldValue("category", e.target.value)
                        }
                        value={formik.values.category}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    </Box>
                    <FormErrorMessage>
                      {formik.errors.category}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.description}>
                    <Box spacing="15px">
                      <Text fontsize="24px">Description</Text>
                      <Textarea
                        maxHeight="200px"
                        onChange={(e) =>
                          formik.setFieldValue("description", e.target.value)
                        }
                        placeholder={productDetail?.description}
                        value={formik.values.description}
                      ></Textarea>
                    </Box>
                    <FormErrorMessage>
                      {formik.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.image}>
                    <Box spacing="15px">
                      <Text fontsize="24px">Image</Text>
                      <div
                        {...getRootProps()}
                        className="dropzone"
                        style={{
                          border: "2px dashed black",
                          borderRadius: "4px",
                          padding: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <input {...getInputProps()} />
                        {formik.values.image !== null ? (
                          <img
                            alt="not-found"
                            src={URL.createObjectURL(formik.values.image)}
                          />
                        ) : (
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        )}
                      </div>
                    </Box>
                    <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                marginRight="10px"
                colorScheme="red"
                type="submit"
                //   onClick={() => {
                //     onClose();
                //   }}
                disabled={formik.isSubmitting}
              >
                Update
              </Button>
              <Button variant="outline" colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}

export default MyComponent;
