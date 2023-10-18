import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Input, VStack, HStack } from "@chakra-ui/react";

function SalesReportModal({ isOpen, onClose, transactions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleGenerateReport = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set end of day
  
    const filtered = transactions.filter(transaction => {
      const date = new Date(transaction.createdAt);
      return date >= start && date <= end;
    });
  
    setFilteredTransactions(filtered);
  };

  const revenue = filteredTransactions.reduce((acc, t) => acc + t.items.reduce((a, item) => a + item.quantity * item.Product.price, 0), 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sales Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>Select Date Range:</Text>
            <HStack spacing={4}>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            </HStack>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
            {/* Display the report details here */}
            <VStack spacing={4} alignItems="flex-start"> 
            <Text fontSize="md" fontWeight="semibold" color="gray.700" mt={2}>
              Number of transactions: {filteredTransactions.length}
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="gray.700" mt={2}>
              Number of products sold: {filteredTransactions.reduce((acc, t) => acc + t.items.reduce((a, item) => a + item.quantity, 0), 0)}
            </Text>
            <Text fontSize="md" fontWeight="semibold" color={revenue === 0 ? "black" : "teal.500"} mt={2}>
              Total revenue: {revenue}
            </Text>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SalesReportModal;