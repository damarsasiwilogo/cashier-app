import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Image,
  Box,
} from "@chakra-ui/react";
import api from "../api";

function CashierTable() {
  const [cashiers, setCashiers] = useState([]);
  useEffect(() => {
    const fetchCashier = async () => {
      const response = await api.get("/cashier");
      const { data } = response;
      setCashiers(data.data);
    };

    fetchCashier();
  }, []);

  return (
    <Box>
      <Text>List of Cashiers</Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Firstname</Th>
            <Th>Lastname</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cashiers.map((cashier, index) => (
            <Tr key={index}>
              <Td>{cashier.username}</Td>
              <Td>{cashier.firstname}</Td>
              <Td>{cashier.lastname}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default CashierTable;
