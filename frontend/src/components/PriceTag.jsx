import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react';

export function formatPrice(value, opts = {}) {
  const { locale = 'en-ID', currency = 'IDR' } = opts;  // Default to Indonesian locale and Rupiah
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    currencyDisplay: 'symbol',  // Display the currency as a symbol
    maximumFractionDigits: 2,
  });
  
  // Replace IDR with Rp for Indonesian Rupiah
  let formattedValue = formatter.format(value);
  if (currency === 'IDR') {
      formattedValue = formattedValue.replace('IDR', 'Rp');
  }
  
  return formattedValue;
}

export const PriceTag = (props) => {
  const { price, currency = 'IDR', salePrice, rootProps, priceProps, salePriceProps } = props;  // Default to IDR if no currency prop is provided
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(price, {
          currency,
        })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </HStack>
  );
}

const Price = (props) => {
  const { isOnSale, children, textProps } = props;
  const defaultColor = mode('gray.700', 'gray.400');
  const onSaleColor = mode('gray.400', 'gray.700');
  const color = isOnSale ? onSaleColor : defaultColor;
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  );
}

const SalePrice = (props) => (
  <Text as="span" fontWeight="semibold" color={mode('gray.800', 'gray.100')} {...props} />
);