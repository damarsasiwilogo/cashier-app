import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust this import path based on your file structure
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image, Button, Text } from "@chakra-ui/react";

function ProductDetailModal({ isOpen, onClose, productId, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const baseURL = "localhost:8000";

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
          <Button colorScheme="blue">Add to Cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductDetailModal;