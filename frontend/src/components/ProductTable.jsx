import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import api from '../api'; // Ensure the path is correct

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added state to manage total pages
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    // Fetch products from API
    const token = localStorage.getItem('token');  // Retrieve token from local storage
    api.get(`/product/${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}` // Use token from local storage
      },
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
      <IconButton 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          ml={4}
          icon={<ArrowBackIcon />}
          variant="ghost"
          aria-label="Previous Page"
      />
      <IconButton 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} // Ensure not exceeding max page
          ml={4}
          icon={<ArrowForwardIcon />}
          variant="ghost"
          aria-label="Next Page"
      />
    </div>
  );
}

export default ProductTable;
