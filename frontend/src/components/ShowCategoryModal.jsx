import React, { useState, useEffect } from 'react';
import api from '../api';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  List,
  ListItem,
  Text,
  Flex,
  Spacer,
  Input
} from '@chakra-ui/react';

function CategoryModal({ isOpen, onClose, productId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/product/category');
        if (response.data.status === 'success') {
          setCategories(response.data.data.categories);
        } else {
          setError('Failed to fetch categories.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const startEditing = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setCurrentCategoryName(categoryName);
  };

  const stopEditing = async () => {
    try {
      const response = await api.patch(`/product/category/${editingCategoryId}`, { name: currentCategoryName });
      if (response.data.status === 'success') {
        // Update the local categories state with the edited category name
        const updatedCategories = categories.map(category =>
          category.id === editingCategoryId ? { ...category, name: currentCategoryName } : category
        );
        setCategories(updatedCategories);
      } else {
        setError(`Failed to update category: ${response.data.message}`);
      }
    } catch (err) {
      setError(`Error updating category: ${err.message}`);
    }
    setEditingCategoryId(null);
  };

  const handleEditInputChange = (event) => {
    setCurrentCategoryName(event.target.value);
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await api.delete(`/product/category/${categoryId}`);
      if (response.data.status === 'success') {
        // Remove the deleted category from the local categories state
        const updatedCategories = categories.filter(category => category.id !== categoryId);
        setCategories(updatedCategories);
      } else {
        setError(`Failed to delete category: ${response.data.message}`);
      }
    } catch (err) {
      setError(`Error deleting category: ${err.message}`);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              <List spacing={3}>
                {categories.map((category) => (
                  <ListItem key={category.id} paddingBottom="10px">
                    <Flex width="100%" alignItems="center">
                      {editingCategoryId === category.id ? (
                        <Input
                          value={currentCategoryName}
                          onChange={handleEditInputChange}
                          onBlur={stopEditing}
                        />
                      ) : (
                        <Text>{category.name}</Text>
                      )}
                      <Spacer />
                      {editingCategoryId === category.id ? (
                        <Button size="sm" onClick={stopEditing}>Done</Button>
                      ) : (
                        <>
                          <Button size="sm" marginLeft="5" onClick={() => startEditing(category.id, category.name)}>Edit</Button>
                          <Button size="sm" marginLeft="5" colorScheme="red" onClick={() => deleteCategory(category.id)}>Delete</Button>
                        </>
                      )}
                    </Flex>
                  </ListItem>
                ))}
              </List>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CategoryModal;