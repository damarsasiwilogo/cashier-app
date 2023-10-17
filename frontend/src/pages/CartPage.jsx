import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import api from '../api';
import { CartItem } from '../components/CartItem';
import { CartOrderSummary } from '../components/CartOrderSummary';
import SidebarWithHeader from '../components/sidebar.jsx';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      api.get('/cart')
          .then((response) => {
              setCartItems(response.data);
              setLoading(false);
          })
          .catch((err) => {
              setError(err.message);
              setLoading(false);
          });
  }, []);

  const handleItemQuantityChange = (itemId, newQuantity) => {
      const updatedCartItems = cartItems.map(item => {
          if (item.id === itemId) {
              return { ...item, quantity: newQuantity };
          }
          return item;
      });
      setCartItems(updatedCartItems);
  };

  const handleItemDeletion = (itemId) => {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
  };

  return (
      <SidebarWithHeader>
          <Box
              bg="white"
              shadow="md"
              borderRadius="md"
              maxW={{
                  base: '3xl',
                  lg: '7xl',
              }}
              mx="auto"
              px={{
                  base: '4',
                  md: '8',
                  lg: '12',
              }}
              py={{
                  base: '6',
                  md: '8',
                  lg: '12',
              }}
          >
              <Stack
                  direction={{
                      base: 'column',
                      lg: 'row',
                  }}
                  align={{
                      lg: 'flex-start',
                  }}
                  spacing={{
                      base: '8',
                      md: '16',
                  }}
              >
                  <Stack
                      spacing={{
                          base: '8',
                          md: '10',
                      }}
                      flex="2"
                  >
                      <Heading fontSize="2xl" fontWeight="extrabold">
                          Cart
                      </Heading>

                      <Stack spacing="6">
                          {cartItems.map((item) => (
                              <CartItem
                                  key={item.id}
                                  {...item}
                                  onChangeQuantity={handleItemQuantityChange}
                                  onDelete={handleItemDeletion}
                              />
                          ))}
                      </Stack>
                  </Stack>

                  <Flex direction="column" align="center" flex="1">
                      <CartOrderSummary cart={cartItems} />
                      <HStack mt="6" fontWeight="semibold">
                          <p>or</p>
                          <Link to="/show-product" color={mode('blue.600', 'blue.200')}>Continue</Link>
                      </HStack>
                  </Flex>
              </Stack>
          </Box>
      </SidebarWithHeader>
  );
};