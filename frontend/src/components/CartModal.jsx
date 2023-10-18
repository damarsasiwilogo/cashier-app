import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CloseButton,
  Text,
  Button,
  Box,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import api from '../api'; // Adjust this import path based on your file structure
import ReceiptSidebar from './ReceiptSidebar';

function CartModal({ isOpen, onClose }) {
    const [cartItems, setCartItems] = useState([]);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        // Fetch cart items when the modal is opened
        api.get('/cart')
          .then(response => {
            setCartItems(response.data);
          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
          });
      }
    }, [isOpen]);
  
  const handleDeleteCartItem = (id) => {
    api.delete(`/cart/${id}`)
      .then(() => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
      })
      .catch(error => {
        console.error('Error deleting cart item:', error);
      });
  };

  const handleUpdateCartItem = (id, newQuantity) => {
    api.patch(`/cart/${id}`, { quantity: newQuantity })
      .then(response => {
        const updatedCartItem = response.data;
        const updatedCartItems = cartItems.map(item => 
          item.id === updatedCartItem.id ? updatedCartItem : item
        );
        setCartItems(updatedCartItems);
      })
      .catch(error => {
        console.error('Error updating cart item:', error);
      });
  };
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.Product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsReceiptOpen(true);
  };
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cart Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <VStack spacing={4} align="stretch">
            {cartItems.map(item => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" position="relative">
                <CloseButton 
                position="absolute" 
                top="5px" 
                right="5px" 
                onClick={() => handleDeleteCartItem(item.id)} 
                />
                <Text><strong>{item.Product.name}</strong></Text>
                <NumberInput 
                value={item.quantity} 
                onChange={(value) => handleUpdateCartItem(item.id, value)}
                min={1}
                >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
                <Text>${item.Product.price * item.quantity}</Text>
            </Box>
            ))}
        </VStack>
        </ModalBody>
        <ModalFooter>
          <Text mr={4}>Total: ${totalPrice}</Text>
          <Button colorScheme="blue" onClick={handleCheckout}>Checkout</Button>
        </ModalFooter>
      </ModalContent>
      <ReceiptSidebar
        isOpenReceipt={isReceiptOpen}
        onCloseReceipt={() => setIsReceiptOpen(false)}
        cartItems={cartItems}
        total={totalPrice}
      />
    </Modal>
  );
}

export default CartModal;