import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import AddCategoryModal from '../components/AddCategoryModal';
import SidebarWithHeader from '../components/sidebar';
import { Button, Box, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";
import { useEffect } from 'react';
import api from '../api';

export const ShowProduct = () => {
  const [user, setUser] = useState(null); // Added state to manage user
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      }
    };

    fetchUserData();
  }, []);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <SidebarWithHeader>
        <Box className="App" p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
            <VStack spacing={5} align="stretch">
                <HStack w="full">
                    <Heading as="h1" size="xl">Product Table</Heading>
                    <Spacer />
                    {user && user.userRole === 'admin' && 
                    <Button onClick={() => setShowModal(true)} colorScheme="teal" size="sm">
                        Add Category
                    </Button>}
                </HStack>
                <ProductTable products={products} />
            </VStack>
            {user && user.userRole === 'admin' &&
            <AddCategoryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                addCategory={addCategory}
            />}
        </Box>
    </SidebarWithHeader>
  );
}