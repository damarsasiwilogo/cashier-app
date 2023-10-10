const { Product, Category } = require("../models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description } = req.body;
  const { filename } = req.file;
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