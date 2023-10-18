import React from 'react';
import { Box, CloseButton, VStack, Text } from "@chakra-ui/react";

function ReceiptSidebar({ isOpenReceipt, onCloseReceipt, cartItems, total }) {

  return (
    <Box
      position="fixed"
      right={0}
      top={0}
      bottom={0}
      width="30%" // You can adjust this width
      bg="white"
      boxShadow="lg"
      zIndex={10}
      transform={isOpenReceipt ? 'translateX(0)' : 'translateX(100%)'}
      transition="transform 0.3s"
    >
      <VStack p={4} spacing={4} alignItems="start">
        <CloseButton onClick={onCloseReceipt} />
        <Text fontSize="2xl" fontWeight="bold">Receipt</Text>
        {cartItems.map(item => (
          <Box key={item.id}>
            <Text>{item.Product.name} - ${item.Product.price} x {item.quantity}</Text>
          </Box>
        ))}
        <Box mt="auto">
          <Text fontSize="xl" fontWeight="bold">Total: ${total}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default ReceiptSidebar;