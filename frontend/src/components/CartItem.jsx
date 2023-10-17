import { CloseButton, Flex, Link, Box, useColorModeValue } from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import React from 'react';
import api from '../api';

const Counter = ({ value, id, onChange }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    api.patch(`/cart/${id}`, { quantity: newQuantity })
        .then(response => {
            const updatedQuantity = response.data.quantity;
            onChange(id, updatedQuantity);
        })
        .catch(error => {
            console.error("Error updating cart item:", error);
        });
};

    return (
        <Flex align="center">
            <button onClick={() => handleQuantityChange(value - 1)}>-</button>
            <Box mx="2">{value}</Box>
            <button onClick={() => handleQuantityChange(value + 1)}>+</button>
        </Flex>
    )
}

export const CartItem = (props) => {
    const {
        id,
        quantity,
        Product: {
            image: imageUrl,
            name,
            description,
            price,
        },
        onChangeQuantity,
        onDelete,   // Use this prop when item is deleted
    } = props;

    const [localQuantity, setLocalQuantity] = React.useState(quantity);
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleDeleteCartItem = () => {
        setIsVisible(false);

        api.delete(`/cart/${id}`)
            .then(() => {
                onDelete(id);  // Notify parent about deletion
            })
            .catch(error => {
                console.error("Error deleting cart item:", error);
            });
    };

    const totalPrice = price * localQuantity;

    if (!isVisible) return null;
  
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={"http://localhost:8000/static/" + imageUrl}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <Counter
            id={props.id}
            value={localQuantity}
            onChange={(itemId, val) => {
                setLocalQuantity(val); // Update the local quantity
                onChangeQuantity?.(itemId, val);
            }}
        />
        <PriceTag price={totalPrice} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => handleDeleteCartItem(props.id)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Counter
        id={props.id}
        value={localQuantity}
        onChange={(val) => {
            setLocalQuantity(val); // Update the local quantity
            onChangeQuantity?.(val)
        }}
        />
        <PriceTag price={totalPrice} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => handleDeleteCartItem(props.id)} />
      </Flex>
    </Flex>
  )
}
