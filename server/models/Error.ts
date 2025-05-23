import  { model, Schema } from "mongoose";
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
    stack: {
      type: String,
      required: false,
    },
    severity: {
      type: String,
      default: "error",
    },
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Error = model<IError>("Error", errorSchema);
