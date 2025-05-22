import mongoose, { model, Schema } from "mongoose";
import { v4 as uuid } from "uuid";
import { IProject } from "../types";

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
    errorRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Error",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export const Project = model<IProject>("Project", projectSchema);
