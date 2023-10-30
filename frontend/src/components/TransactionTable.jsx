import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import TransactionDetailsModal from './TransactionDetailsModal';

function TransactionTable({ transactions }) {
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleViewDetails(transaction) {
    setSelectedTransaction(transaction);
    onOpen();
  }

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Transaction ID</Th>
          <Th>Cashier</Th>
          <Th>Total Amount</Th>
          <Th>Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.id}</Td>
            <Td>{transaction.Account.firstName} {transaction.Account.lastName}</Td>
            <Td>{formatToIDR(transaction.totalAmount)}</Td>
            <Td>{new Date(transaction.createdAt).toLocaleDateString()}</Td>
            <Td>
              <Button size="sm" colorScheme="blue" onClick={() => handleViewDetails(transaction)}>
                View Details
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <TransactionDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        transaction={selectedTransaction}
      />
    </Table>
  );
}

export default TransactionTable;