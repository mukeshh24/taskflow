import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import generateToken from "../utils/generateToken.js";
import Task from "../models/task.model.js";

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const emailLowerCase = email.toLowerCase();

    const checkEmailIsExists = await User.findOne({ email: emailLowerCase });
    if (checkEmailIsExists) {
      return next(errorHandler(400, "User already registered"));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email: emailLowerCase,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });
    if (!user) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    const token = generateToken({
      id: user._id,
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    const userData = user.toObject({ getters: true });
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(errorHandler(400, "UserId are required"));
    }

    const userData = await User.findById(userId)
      .select("name email")
      .lean()
      .exec();

    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    if (!userId) {
      return next(errorHandler(400, "UserId are required"));
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }

    if (name) {
      userData.name = name;
    }

    if (email) {
      return next(errorHandler(400, "Email cannot be updated"));
    }

    if (password) {
      if (password.length >= 3) {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        userData.password = hashPassword;
      }
    }

    await userData.save();

    const userDataRemovePassword = userData.toObject({ getters: true });
    delete userDataRemovePassword.password;

    res.status(200).json({
      success: true,
      message: "User update successfully",
      user: userDataRemovePassword,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId);

    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }

    await Task.deleteMany({ authorId: userId });

    await User.findByIdAndDelete(userId);

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
