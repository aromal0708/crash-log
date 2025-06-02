// Description:Model for managing projects in the application.
// This model defines the schema for project data, including user association, project name, description, and API key.


//Import necessary modules
import mongoose, { model, Schema } from "mongoose";
import { v4 as uuid } from "uuid";
import { IProject } from "../types";


// Define the schema for the Project model
const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
      default: () => uuid(),
      unique: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export const Project = model<IProject>("Project", projectSchema);
