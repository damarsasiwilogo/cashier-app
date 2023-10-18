const { Product, Cart } = require('../models');
const jwt = require('jsonwebtoken');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Decode the token to get the user's ID
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'ini_jwt_loh');  
    const userId = decoded.id;  // Extract user's ID from the token's payload

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Add product to cart or update quantity if product already in cart
    let cartItem = await Cart.findOne({ where: { productId, userId } });  // Include userId in the search criteria
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        productId: product.id,
        quantity: quantity,
        userId: userId   // Add userId when creating a new cart item
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

// Delete a specific cart item
exports.deleteCartItem = async (req, res) => {
    try {
      const { id } = req.params;
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        return res.status(404).send({ message: 'Cart item not found' });
      }
  
      await cartItem.destroy();
      res.status(200).send({ message: 'Cart item deleted successfully' });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  exports.updateCartItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        return res.status(404).send({ message: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      // Fetch the updated cart item with associated product data
      const updatedCartItem = await Cart.findByPk(id, {
        include: [{ model: Product }]
      });
  
      res.status(200).send(updatedCartItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };
  
  // Clear all cart items middleware
  exports.clearCartItems = async (req, res) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Decode the token to get the user's ID
        const decoded = jwt.verify(token, 'ini_jwt_loh');  
        const userId = decoded.id;  // Extract user's ID from the token's payload

        // Clear all cart items for the user
        await Cart.destroy({ where: { userId: userId } });

        // Send a success response
        res.status(200).send({ message: 'Cart items cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart items:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};