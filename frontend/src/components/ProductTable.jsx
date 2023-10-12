import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import api from '../api'; // Ensure the path is correct

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added state to manage total pages
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    // Fetch products from API
    api.get(`/product/${currentPage}`, {
      params: {
        sortBy: sortConfig.key,
        order: sortConfig.direction
      }
    })
      .then(response => {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.pagination.totalPages); // Update total pages
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th cursor="pointer" onClick={() => requestSort('name')}>Name</Th>
            <Th cursor="pointer" onClick={() => requestSort('price')}>Price</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
        ml={4}
      >
        Previous Page
      </Button>
      <Button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} // Ensure not exceeding max page
      >
        Next Page
      </Button>
    </div>
  );
}

export default ProductTable;