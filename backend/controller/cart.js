const { Product, Cart } = require('../models');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Add product to cart or update quantity if product already in cart
    let cartItem = await Cart.findOne({ where: { productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        productId: product.id,
        quantity: quantity
      });
    }

    res.status(201).send(cartItem);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// List items in cart
exports.listItems = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ include: Product });
    res.status(200).send(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};