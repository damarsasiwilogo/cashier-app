import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  Image,
  Button,
  Text,
  useToast,
  Box,
  VStack,
  Stack,
} from "@chakra-ui/react";

function ProductDetailModal({ isOpen, onClose, productId, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const baseURL = "localhost:8000";
  const toast = useToast(); // <-- Chakra UI toast for feedback

  useEffect(() => {
    if (productId && isOpen) {
      api
        .get(`/product/detail/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId, isOpen]);

  const handleAddToCart = () => {
    // Make an API call to add the product to the cart
    api
      .post(
        `/cart/add`,
        {
          productId: product.id,
          quantity: productCount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Notify the user the product was added successfully
        toast({
          title: "Product added to cart.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Notify the parent component about the addition
        onAddToCart && onAddToCart(product, productCount);

        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        toast({
          title: "Error adding product to cart.",
          description: error.message || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{product?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} alignItems="center">
            <Image
              src={`http://${baseURL}/static/${product?.image}`}
              alt={product?.name}
              width="250px"
              height="250px"
            />
            <Text fontWeight="bold" fontSize="xl">
              Price: {formatToIDR(product?.price)}
            </Text>
            <Text>{product?.description}</Text>
            {product?.Category && (
              <Text>Category: {product?.Category.name}</Text>
            )}
            <Stack direction="row" spacing={2} width="160px">
              <Button
                size="sm"
                height="32px"
                onClick={() => setProductCount((prev) => Math.max(prev - 1, 1))}
              >
                -
              </Button>
              <NumberInput
                value={productCount}
                onChange={(value) => setProductCount(value)}
                min={1}
                width="100%"
                height="32px"
              >
                <NumberInputField px={1} height="100%" />{" "}
                {/* Set height to 100% to fill the container */}
              </NumberInput>
              <Button
                size="sm"
                height="32px"
                onClick={() => setProductCount((prev) => prev + 1)}
              >
                +
              </Button>
            </Stack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Box width="100%" display="flex" justifyContent="center">
            {" "}
            {/* Center aligned "Add to Cart" button */}
            <Button colorScheme="blue" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductDetailModal;
