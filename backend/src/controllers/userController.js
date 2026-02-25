import validator from "validator";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// user register
async function userRegister(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All Fields are Required!",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid Email!" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be Atleast 8 Characters!",
    });
  }

  try {
    const emailLowerCase = email.toLowerCase();

    if (await User.findOne({ email: emailLowerCase })) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: emailLowerCase,
      password: hashPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// user login
async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password Required!" });
  }

  try {
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login  Successful!",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// user data
async function userData(req, res) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "User Found Successful!", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// user name, email update
async function userUpdate(req, res) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  const { name, email } = req.body;

  if (!name || !email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Valid Name and Email Required!" });
  }

  try {
    const emailLowerCase = email.toLowerCase();

    const existsUser = await User.findOne({
      email: emailLowerCase,
      _id: { $ne: req.user.id },
    });

    if (existsUser) {
      return res.status(409).json({
        success: false,
        message: "Email Aready in Use by Another Account!",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email: emailLowerCase },
      { new: true, runValidators: true },
    ).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "User Update Successful!", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// user password update
async function userPasswordUpdate(req, res) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 8 characters!",
    });
  }

  try {
    const user = await User.findById(req.user.id).select("password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const matchPassword = await bcrypt.compare(currentPassword, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Current Password Incorrect!" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Update Successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

export { userRegister, userLogin, userData, userUpdate, userPasswordUpdate };
