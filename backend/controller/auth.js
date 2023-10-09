const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Account } = require("../models");

const JWT_SECRET_KEY = "ini_JWT_loh";

exports.handleRegister = async (req, res) => {
  const { username, password, email, firstName, lastName, userRole } = req.body;

  const existingAccount = await Account.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (existingAccount) {
    return res.status(400).json({
      ok: false,
      message: "Username or email is already registered",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await Account.create({
      username,
      password: hashPassword,
      email,
      firstName,
      lastName,
      userRole,
    });
    res.json({
      ok: true,
      data: {
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
