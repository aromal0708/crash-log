import mongoose, { model, Schema } from "mongoose";
import { IError } from "../types";

const errorSchema = new Schema<IError>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    stack: String,
    severity: String,
    fileName: String,
    path: String,
    method: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true, versionKey: false }
);

export const Error = model<IError>("Error", errorSchema);
