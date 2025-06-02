// Description: Model for user management in the application.
// This model defines the schema for user data, including email, projects, name, and password.

// Import necessary modules
import { Schema, model } from "mongoose";
import { IUser } from "../types";

// Define the schema for the User model
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>("User", userSchema);
