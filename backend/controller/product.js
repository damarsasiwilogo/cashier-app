const jwt = require("jsonwebtoken");
const { Product, Category } = require("../models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description, isActive } = req.body;
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
      msg: "New Product Created!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
exports.handleInActive = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await Product.findByPk(productId);

    if (!data.isActive) {
      return res.status(400).json({
        ok: false,
        data: data.dataValues,
        msg: `Cannot Delete data that has been deleted!`,
      });
    }

    data.isActive = false;

    data.save();

    const responseObj = data;

    res.status(200).json({
      ok: true,
      data: responseObj,
      msg: `Delete event with id ${productId} success!`,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: String(error),
    });
  }
};

exports.handleCreateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};

exports.handleUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.update({ name }, { where: { id } });
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
}

exports.handleDeleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.destroy({ where: { id } });
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
}