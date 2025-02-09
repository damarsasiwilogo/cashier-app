import React, { useState, useEffect } from "react";
import AddCategoryModal from "../components/AddCategoryModal";
import { Button, Box, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";
import api from "../api";
import SidebarWithHeader from "../components/sidebar";

const ShowCashierPage = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedProfile = localStorage.getItem("profile");
        const userId = storedProfile ? JSON.parse(storedProfile).id : null;

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

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <SidebarWithHeader>
      <Box
        className="App"
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg="white"
      >
        <VStack spacing={5} align="stretch">
          <HStack w="full">
            <Heading as="h1" size="xl">
              Cashier Table {/* Ubah judul */}
            </Heading>
            <Spacer />
            {user && user.userRole === "admin" && (
              <Button
                onClick={() => setShowModal(true)}
                colorScheme="teal"
                size="sm"
              >
                Add Category
              </Button>
            )}
            {user && user.userRole === "cashier" && (
              <Button colorScheme="teal" size="sm">
                View Cart
              </Button>
            )}
          </HStack>
        </VStack>
        {user && user.userRole === "admin" && (
          <AddCategoryModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            addCategory={addCategory}
          />
        )}
      </Box>
    </SidebarWithHeader>
  );
};
export default ShowCashierPage;
