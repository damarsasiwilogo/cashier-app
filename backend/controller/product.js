const { Product, Category } = require("../models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description } = req.body;
  const { filename } = req.file;

  try {
    const product = await Product.create({
      image: filename,
      name,
      description,
      price,
      category,
      isActive,
    });
    res.json({
      ok: true,
      data: {
        image: product.image,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        isActive: product.isActive,
      },
      msg: "New Event Created!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
