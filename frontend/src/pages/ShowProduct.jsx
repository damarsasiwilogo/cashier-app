import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import AddCategoryModal from '../components/AddCategoryModal';
import SidebarWithHeader from '../components/sidebar';
import { Button } from "@chakra-ui/react";

export const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <SidebarWithHeader>
        <div className="App">
        <h1>Product Table</h1>
        <Button onClick={() => setShowModal(true)} colorScheme="teal">
            Add Category
        </Button>
        <ProductTable products={products} />
        <AddCategoryModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            addCategory={addCategory}
        />
        </div>
    </SidebarWithHeader>
  );
}
