const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const hbs = require("handlebars");
const { Account } = require("../models");
const crypto = require("crypto");
const JWT_SECRET_KEY = "ini_jwt_loh";
const mailer = require("../lib/nodemailer");

exports.handleLogin = async (req, res) => {
  const { identity: identity, password } = req.body;

  try {
    const account = await Account.findOne({
      where: {
        [Op.or]: {
          username: identity,
          email: identity,
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
        id: account.id,
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
      message: "Login is success Broo!!",
      data: response,
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
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const account = await Account.findByPk(accountId);

    if (!account) {
      res.status(400).json({
        ok: false,
        message: "Account not found Broo!!",
      });
      return;
    }

    if (username) {
      account.username = username;
    }
    if (password) {
      account.password = password;
    }
    if (email) {
      account.email = email;
    }
    if (firstName) {
      account.firstName = firstName;
    }
    if (lastName) {
      account.lastName = lastName;
    }
    if (req.file) {
      account.photoProfile = req.file.filename;
    }
    // account.photoProfile = filename;
    await account.save();

    const response = {
      username: account.username,
      password: account.password,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      photoProfile: account.photoProfile,
    };

    res.status(200).json({
      ok: true,
      message: "Your account is updated Broo!!",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.getAccountProfile = async (req, res) => {
  const { id: accountId } = req.user;

  try {
    const profile = await Account.findOne({
      where: { id: accountId },
    });

    if (!profile) {
      res.status(400).json({
        ok: false,
        message: "Account not found Broo!!",
      });
      return;
    }

    const response = {
      username: profile.username,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      userRole: profile.userRole,
      photoProfile: profile.photoProfile,
    };

    res.status(200).json({
      ok: true,
      message: "Your account profile Broo!!",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const user = await Account.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(400).json({
        ok: false,
        message: "Email is not regitered Broo!!",
      });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setTime(tokenExpiry.getTime() + 3600000);

    const result = await Account.update(
      {
        uniqueCode: tokenHash,
      },
      {
        where: { email: req.body.email },
      }
    );

    const resetLink = `${req.protocol}://localhost:3000/reset-password/${token}`;
    const templateRaw = fs.readFileSync(
      __dirname + "/../email-html/email.html",
      "utf8"
    );

    const templateCompile = hbs.compile(templateRaw);
    const emailHTML = templateCompile({
      userName: user.username,
      resetLink,
    });
    const resultEmail = await mailer.sendMail({
      to: user.email,
      from: "dummybro06@gmail.com",
      subject: "Reset your password to continue",
      html: emailHTML,
    });

    res.status(200).json({
      ok: true,
      message: "Password reset email sent Broo!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await Account.findOne({
      where: {
        uniqueCode: req.body.uniqueCode,
      },
    });

    if (!user) {
      res.status(400).json({
        ok: false,
        message: "Password reset token is invalid or has expired Broo!!",
      });
      return;
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const result = await Account.update(
      {
        password,
        uniqueCode: null,
      },
      {
        where: {
          uniqueCode: req.body.uniqueCode,
        },
      }
    );

    res.status(200).json({
      ok: true,
      message: "Your password has been changed Broo!!",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
