const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const { Account } = require("../models");

const JWT_SECRET_KEY = "ini_jwt_loh";

exports.handleCreateCashier = async (req, res) => {
  const { username, password, email, firstName, lastName, userRole, isActive } =
    req.body;
  try {
    const cashier = await Account.create({
      username,
      password,
      email,
      firstName,
      lastName,
      userRole,
      isActive,
    });
    res.json({
      ok: true,
      data: {
        username: Account.username,
        password: Account.password,
        email: Account.email,
        firstName: Account.firstName,
        lastName: Account.lastName,
        userRole: Account.userRole,
        isActive: Account.isActive,
      },
      msg: "New Account Created!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
