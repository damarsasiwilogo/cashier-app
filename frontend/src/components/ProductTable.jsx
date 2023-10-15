import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Button, Image } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import api from '../api'; // Ensure the path is correct

function ProductTable() {
  const [user, setUser] = useState(null); // Added state to manage user
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added state to manage total pages
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const baseURL = "localhost:8000"

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedProfile = localStorage.getItem("profile");
        const userId = storedProfile ? JSON.parse(storedProfile).id : null;

        // If userId is not available, log an error and return to prevent API call
        if (!userId) {
          console.error("User ID not available");
          return;
        }

        const response = await api.get(`/auth/account/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.ok) {
          setUser(response.data.data);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
            <Th>Image</Th>
            <Th cursor="pointer" onClick={() => requestSort('name')}>Name</Th>
            <Th cursor="pointer" onClick={() => requestSort('price')}>Price</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={index}>
              <Td>
                <Image 
                src={`http://${baseURL}/static/${product.image}`} 
                alt={product.name} 
                boxSize="75px" // Adjust size as needed
                objectFit="cover"
                fallbackSrc="https://st2.depositphotos.com/1006899/8089/i/450/depositphotos_80897014-stock-photo-page-not-found.jpg"
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.description}</Td>
              {user && user.userRole === 'admin' && 
              <Td>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </Td>
              }
              {user && user.userRole === 'cashier' &&
              <Td>
                <Button>View</Button>
              </Td>
              }
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
