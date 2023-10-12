import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../api'; // Update with the actual path to your api.js file

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

function AddCategoryModal({ isOpen, onClose }) {
  // Handle form submission
  const handleFormSubmit = (values, actions) => {
    // Make API call to add the new category
    api.post('/product/category', values) // Update '/category-endpoint' as per your API
      .then(response => {
        console.log('Category added:', response.data);
        actions.setSubmitting(false);
        onClose(); // Close the modal on success
        // Optionally, show a success notification to the user
      })
      .catch(error => {
        console.error('Error adding category:', error);
        actions.setSubmitting(false);
        actions.setStatus({ errorMsg: 'There was an error adding the category.' });
        // Optionally, show an error notification to the user
      });
  };

  // Rest of your component code remains similar
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ newCategory: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.newCategory && form.touched.newCategory}>
                      <FormLabel htmlFor="name">Category Name</FormLabel>
                      <Input {...field} id="name" placeholder="Enter new category" />
                      <FormErrorMessage>{form.errors.newCategory}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button ml={3} type="submit" isLoading={props.isSubmitting}>Add</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default AddCategoryModal;