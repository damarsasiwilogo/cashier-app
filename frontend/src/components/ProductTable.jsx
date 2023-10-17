import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Button, Image, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import ProductDetailModal from './ProductDetailModal';
import { SearchBar } from './SearchBar';
import api from '../api'; // Ensure the path is correct

function ProductTable() {
  const [user, setUser] = useState(null); // Added state to manage user
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added state to manage total pages
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const baseURL = "localhost:8000"

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };


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

  const fetchProducts = (query = '') => {
    const token = localStorage.getItem('token');  // Retrieve token from local storage
    api.get(`/product/${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}` // Use token from local storage
      },
      params: {
        sortBy: sortConfig.key,
        order: sortConfig.direction,
        qname: query
      }
    })
    .then(response => {
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.pagination.totalPages); // Update total pages
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
  }
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProducts(query);
  };
  
  useEffect(() => {
    fetchProducts(searchQuery);
  }, [currentPage, sortConfig, searchQuery]);
    
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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <SearchBar onSearch={handleSearch} />
      </Flex>
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
                <Button variant="solid" colorScheme="blue" size="sm" mx={1}>
                  <EditIcon />
                </Button>
                <Button variant="solid" colorScheme="red" size="sm" mx={1}>
                  <DeleteIcon />
                </Button>
              </Td>
              }
              {user && user.userRole === 'cashier' &&
              <Td>
                <Button onClick={() => handleProductClick(product.id)}>View</Button>
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
      <ProductDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        productId={selectedProductId} 
      />
    </div>
  );
}

export default ProductTable;
