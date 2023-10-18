const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const { Account } = require("../models");
const { log } = require("util");

const JWT_SECRET_KEY = "ini_jwt_loh";

exports.handleCreateCashier = async (req, res) => {
  const { username, password, email, firstName, lastName, isActive } = req.body;
  try {
    const cashier = await Account.create({
      username,
      password,
      email,
      firstName,
      lastName,
      userRole: "cashier",
      isActive: true,
    });
    res.json({
      ok: true,
      data: {
        username: cashier.username,
        password: cashier.password,
        email: cashier.email,
        firstName: cashier.firstName,
        lastName: cashier.lastName,
        userRole: cashier.userRole,
        isActive: cashier.isActive,
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
