import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import SidebarWithHeader from '../components/sidebar.jsx';
import api from '../api';

export const HomePage = () => {
  const [user, setUser] = useState(null);

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

  return (
    <SidebarWithHeader>
      <Box 
        p={4} 
        shadow="md" 
        borderWidth="1px" 
        flex="1" 
        borderRadius="md"
        bgImage="url('./homepage-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        h="84vh"
        w="82vw"
        position="relative"
      >
        <Flex direction="column" h="100%" justifyContent="space-between">
          <Box>
            {user && <Heading mb={4} color="white">Welcome, {user.firstName} {user.lastName}!</Heading>}
            <Text fontSize="xl" color="white">We're glad to have you here. Have a good time!</Text>
          </Box>

          {/* Button linking to /show-product for cashier */}
          {user && user.userRole === 'cashier' && 
          <Flex direction="row" spacing={4} alignSelf="flex-start">
          <Link to="/show-product">
            <Button colorScheme="teal" mr={2}>
              View Products
            </Button>
          </Link>
          <Link to="/cart">
            <Button colorScheme="teal" mr={2}>
              View Cart
            </Button>
          </Link>
          </Flex>}

          {/* Buttons for admin */}
          {user && user.userRole === 'admin' && 
          <Flex direction="row" spacing={4} alignSelf="flex-start">
            <Link to="/show-product">
              <Button colorScheme="teal" mr={2}>
                View Products
              </Button>
            </Link>
            <Link to="/transactions">
              <Button colorScheme="teal" mr={2}>
                View Transactions
              </Button>
            </Link>
          </Flex>}
        </Flex>
      </Box>
    </SidebarWithHeader>
  );
};
