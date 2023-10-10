const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const { Account } = require("../models");

const JWT_SECRET_KEY = "ini_jwt_loh";

exports.handleLogin = async (req, res) => {
  const { identity: identity, password } = req.body;

  try {
    const account = await Account.findOne({
      where: {
        [Op.or]: {
          username: identity,
          email: identity,
          password,
        },
      },
    });

    if (!account) {
      res.status(401).json({
        ok: false,
        message: "Your username/password is incorrect Broo!!",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, account.password);
    if (!isValid) {
      res.status(401).json({
        ok: false,
        message: "Your username/password is incorrect Broo!!",
      });
      return;
    }

    const payload = { id: account.id, userRole: account.userRole };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = {
      token,
      profile: {
        username: account.username,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        userRole: account.userRole,
        photoProfile: account.photoProfile,
      },
    };

    res.status(200).json({
      ok: true,
      message: response,
    });
  } catch (err) {
    res.status(401).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.updateProfile = async (req, res) => {
  const accountId = req.user.id;
  const { email, username } = req.body;
  try {
    const account = await Account.findByPK(accountId);
    if (!account) {
      res.status(400).json({
        ok: false,
        message: "Account not found Broo!!",
      });
      return;
    }
    if (email) {
      account.email = email;
    }
    if (username) {
      account.username = username;
    }
    await account.save();

    return res.json({
      ok: true,
      data: {
        username: account.username,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        userRole: account.userRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.handleUploadPhoto = async (req, res) => {
  const { filename } = req.file;
  const { id: accountId } = req.user;

  try {
    const profile = await Account.findOne({
      where: { id: accountId },
    });

    if (profile.photoProfile) {
      fs.rmSync(__dirname + "/../public/" + profile.photoProfile);
    }
    profile.photoProfile = filename;
    await profile.save();

    res.json({
      ok: true,
      message: "Your profile photo updated Broo!!",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
