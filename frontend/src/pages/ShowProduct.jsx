import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import AddCategoryModal from "../components/AddCategoryModal";
import ShowCategoryModal from "../components/ShowCategoryModal";
import CartModal from "../components/CartModal"; // <-- Import CartModal component
import SidebarWithHeader from "../components/sidebar";
import { Button, Box, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export const ShowProduct = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false); // <-- New state for cart modal
  const [isReceiptSidebarOpen, setIsReceiptSidebarOpen] = useState(false);

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
              Product Table
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
              <Link to="/cart">
                <Button colorScheme="teal" size="sm">
                  View Cart
                </Button>
              </Link>
            )}
          </HStack>
          <ProductTable products={products} />
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
