import React from 'react';
import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
    useToast
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import api from '../api'; // Adjust the path to where your api.js file is
import { formatPrice } from './PriceTag';
import { useNavigate } from 'react-router-dom';

export const CartOrderSummary = ({ cart }) => {
    const toast = useToast();
    const navigate = useNavigate();

    const computeTotalPrice = () => {
        let total = 0;
        for (const item of cart) {
            total += item.Product.price * item.quantity;
        }
        return total;
    };

    const handleCheckout = async () => {
        try {
            const response = await api.post('/transaction/checkout', { cart: cart });
            // Handle the response based on your API's specification
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Checkout successful!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/show-product');
                // You can also navigate to another page, or clear the cart on the frontend, etc.
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error during checkout. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const total = computeTotalPrice();

    return (
        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
            <Heading size="md">Order Summary</Heading>
            <Stack spacing="6">
                <Flex justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">Total</Text>
                    <Text fontSize="xl" fontWeight="extrabold">{formatPrice(total)}</Text>
                </Flex>
            </Stack>
            <Button 
                colorScheme="blue" 
                size="lg" 
                fontSize="md" 
                rightIcon={<FaArrowRight />}
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </Stack>
    );
};