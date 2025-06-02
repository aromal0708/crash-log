//Controller for handling error ingestion in the application.
// This controller processes incoming error reports, validates the data, and saves it to the database.

// Import necessary modules
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//User registration route handler
export const register = async (req: Request, res: Response) => {
  try {

    // Extract user details from the request body
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All feilds required",
      });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance and save it to the database
    const user = new User({
      name,
      email,
      password: hashedPassword,
      project: [],
    });

    // Save the user to the database
    await user.save();

    // Respond with success message
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      return;
    }
  }
};

//User login route handler
export const login = async (req: Request, res: Response) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }
    // Check if the user exists
    const user = await User.findOne({ email });

    // If user not found, respond with an error
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Compare the provided password with the hashed password in the database
    // If the password is incorrect, respond with an error
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
      return;
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined in the environment variables");
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "14d" });

    // Set the JWT token in a cookie
    // The cookie is set to be HTTP-only, secure (in production), and has a max age of 14 days
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    });

    // Respond with success message and user details
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      return;
    }
  }
};
