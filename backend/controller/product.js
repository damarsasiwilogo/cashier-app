const jwt = require("jsonwebtoken");
const { Product, Category } = require("../models");

exports.handleCreateProduct = async (req, res, file) => {
  const { name, price, category, description, isActive } = req.body;
  const { filename } = file;

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

exports.getProducts = async (req, res) => {
  const { page } = req.params;  // Extracting page from route parameters
  const limit = 5;

  // Validate and parse page
  const pageNumber = parseInt(page, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid page number.',
    });
  }

  try {
    // Retrieve products from database sorted and paginated
    const { count, rows: products } = await Product.findAndCountAll({
      where: {
        isActive: true,
      },
      order: [
        [req.sorting.sortBy, req.sorting.order]  // Use sorting parameters from middleware
      ],
      limit: limit,
      offset: (pageNumber - 1) * limit
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // Send the retrieved products as JSON
    res.status(200).json({
      status: 'success',
      data: {
        products,
        pagination: {
          totalItems: count,
          totalPages: totalPages,
          currentPage: pageNumber,
          itemsPerPage: limit
        }
      },
    });

  } catch (error) {
    // Handle any errors during the database query
    res.status(500).json({
      status: 'error',
      message: 'Database query failed.',
      error: error.toString(),
    });
  }
};

// Middleware to handle sorting
exports.sortProducts = (req, res, next) => {
  const { sortBy, order } = req.query;

  // Validate sortBy and order
  if (!['name', 'category', 'price'].includes(sortBy)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid sortBy parameter. Use "name", "category", or "price".',
    });
  }

  if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid order parameter. Use "ASC" or "DESC".',
    });
  }

  // Attach sorting parameters to request object
  req.sorting = {
    sortBy,
    order: order.toUpperCase()
  };

  // Move to next middleware or route handler
  next();
};