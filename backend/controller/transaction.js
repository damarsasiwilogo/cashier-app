const jwt = require('jsonwebtoken');
const { Transaction, Cart, Product } = require('../models');

exports.checkout = async (req, res, next) => {
    try {
        // Decode the token to get the user's ID
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'ini_jwt_loh');
        const userId = decoded.id;

        console.log("UserID from token:", userId);

        // Fetch the user's cart items
        const cartItems = await Cart.findAll({ 
            where: { userId: userId },
            include: [{ model: Product }]  // Include the associated products
        });        
        console.log("Fetched cart items:", cartItems);

        // If there are no items in the cart, set an error in the request object
        if (!cartItems.length) {
            req.checkoutError = 'No items in the cart to checkout.';
            return next();
        }

        // Calculate the total amount
        const totalAmount = cartItems.reduce((acc, item) => {
            if (item.Product) {
                return acc + item.Product.price * item.quantity;
            }
            return acc;
        }, 0);        
        console.log("Calculated total amount:", totalAmount);

        // Create a new transaction with the cart items and total amount
        const transaction = await Transaction.create({
            userId: userId,
            items: cartItems,
            totalAmount: totalAmount
        });
        console.log("Transaction created:", transaction);

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error during checkout:', error);
        req.checkoutError = 'Server error during checkout.'; 
        next();
    }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: 'Account' // This will include the associated Account details based on the userId foreign key.
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
};