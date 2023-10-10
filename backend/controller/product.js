const { Product, Category } = require("..models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description } = req.body;
  const { filename } = req.file;
};
