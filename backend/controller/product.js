const jwt = require("jsonwebtoken");
const { Product, Category } = require("../models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description, isActive } = req.body;
  const { filename } = file;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: filename,
      isActive,
    });
    res.json({
      ok: true,
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
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

exports.handleUpdateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, category, description, isActive } = req.body;
  const { filename } = req.file;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(400).json({
        ok: false,
        data: null,
        msg: `Product with id ${productId} is not found!`,
      });
    }

    product.image = filename;
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.isActive = isActive;

    product.save();

    const responseObj = {
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      isActive: product.isActive,
    };

    res.status(200).json({
      ok: true,
      data: responseObj,
      msg: `Update event with id ${productId} success!`,
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
};

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
};

exports.handleViewProductListPagination = async (req, res) => {
  const { page } = req.params;
  const { limit } = req.query;
  const offset = (page - 1) * limit;

  try {
    const product = await Product.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      where: {
        isActive: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};

exports.handleFilterProductByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const product = await Product.findAll({
      where: {
        category,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};

exports.handleFilterProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findAll({
      where: {
        name,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};

exports.handleSortProductAlphabetically = async (req, res) => {
  const { order } = req.query;
  const sortOrder = order === "desc" ? "DESC" : "ASC";

  try {
    const product = await Product.findAll({
      order: [["name", sortOrder]],
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};

exports.handleSortProductByPrice = async (req, res) => {
  const { order } = req.query;
  const sortOrder = order === "desc" ? "DESC" : "ASC";

  try {
    const product = await Product.findAll({
      order: [["price", sortOrder]],
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
};
