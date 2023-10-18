import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Image,
  Box
} from "@chakra-ui/react";

const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {transaction?.items.map(item => (
              <Box key={item.id} p={4} mb={4} border="1px solid" borderColor="gray.200" borderRadius="md" w="100%">
                <Text><strong>Product:</strong> {item.Product.name}</Text>
                <Text><strong>Price:</strong> {formatToIDR(item.Product.price)}</Text>
                <Text><strong>Quantity:</strong> {item.quantity}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TransactionDetailsModal;