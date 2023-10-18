import React, { useState, useEffect } from "react";
import { Box, Text, VStack, HStack, Button, Skeleton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import api from "../api"; // Ensure the path is correct based on your directory structure
import TransactionTable from "../components/TransactionTable";
import SidebarWithHeader from "../components/sidebar";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await api.get("/transaction"); // Adjust the endpoint if it's different
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <SidebarWithHeader>
      <VStack
        spacing={4}
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        width="90%"
        margin="0 auto"
      >
        <HStack
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Text fontSize="2xl" fontWeight="bold">Transactions</Text>
          {/* <HStack spacing={4}>
            <Button size="sm" fontSize="sm" colorScheme="blue">
              Sales Aggregate
            </Button>
            <Button size="sm" fontSize="sm" colorScheme="blue">
              Sales Report
            </Button>
          </HStack> */}
        </HStack>
        {loading ? (
          <SkeletonTable />
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </VStack>
    </SidebarWithHeader>
  );
}

function SkeletonTable() {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <Skeleton width="100px" height="20px" />
          </Th>
          <Th>
            <Skeleton width="200px" height="20px" />
          </Th>
          <Th>
            <Skeleton width="150px" height="20px" />
          </Th>
          <Th>
            <Skeleton width="180px" height="20px" />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.from({ length: 6 }).map((_, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton width="100px" height="20px" />
            </Td>
            <Td>
              <Skeleton width="200px" height="20px" />
            </Td>
            <Td>
              <Skeleton width="150px" height="20px" />
            </Td>
            <Td>
              <Skeleton width="180px" height="20px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TransactionPage;