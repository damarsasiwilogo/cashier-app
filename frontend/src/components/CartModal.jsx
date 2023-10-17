import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Box,
  VStack
} from "@chakra-ui/react";
import api from '../api'; // Adjust this import path based on your file structure

function CartModal({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Fetch cart items when the modal is opened
      api.get('/cart')
        .then(response => {
          setCartItems(response.data);
          // Calculate total price
          const total = response.data.reduce((sum, item) => sum + (item.Product.price * item.quantity), 0);
          setTotalPrice(total);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cart Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {cartItems.map(item => (
              <Box key={item.id} p={4} borderWidth="1px" borderRadius="md">
                <Text><strong>{item.Product.name}</strong> (x{item.quantity})</Text>
                <Text>${item.Product.price * item.quantity}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Text mr={4}>Total: ${totalPrice}</Text>
          <Button colorScheme="blue">Checkout</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CartModal;