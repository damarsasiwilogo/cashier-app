import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust this import path based on your file structure
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, 
    Image, Button, Text, useToast // <-- Added useToast for feedback
} from "@chakra-ui/react";

function ProductDetailModal({ isOpen, onClose, productId, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const baseURL = "localhost:8000";
  const toast = useToast(); // <-- Chakra UI toast for feedback

  useEffect(() => {
    if (productId && isOpen) {
      api.get(`/product/detail/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
    }
  }, [productId, isOpen]);

  const handleAddToCart = () => {
    // Make an API call to add the product to the cart
    api.post(`/cart/add`, {
      productId: product.id,
      quantity: productCount,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      // Notify the user the product was added successfully
      toast({
        title: "Product added to cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Notify the parent component about the addition
      onAddToCart && onAddToCart(product, productCount);

      // Close the modal
      onClose();
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      toast({
        title: "Error adding product to cart.",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={`http://${baseURL}/static/${product?.image}`} alt={product?.name} mb={4} />
          <Text mb={2}>Price: ${product?.price}</Text>
          <Text mb={2}>{product?.description}</Text>
          {product?.Category && <Text mb={2}>Category: {product?.Category.name}</Text>}
          <NumberInput value={productCount} onChange={(value) => setProductCount(value)} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddToCart}>Add to Cart</Button> {/* <-- Added onClick handler */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductDetailModal;