import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import AddCategoryModal from '../components/AddCategoryModal';
import SidebarWithHeader from '../components/sidebar';
import { Button, Box, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";

export const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
                    <Button onClick={() => setShowModal(true)} colorScheme="teal" size="sm">
                        Add Category
                    </Button>
                </HStack>
                <ProductTable products={products} />
            </VStack>
            <AddCategoryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                addCategory={addCategory}
            />
        </Box>
    </SidebarWithHeader>
  );
}