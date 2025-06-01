import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  projects: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IError extends Document {
  projectId: Types.ObjectId;
  apiKey: string;
  file: string;
  message: string;
  stack?: string;
  severity: string;
  fileName: string;
  path: string;
  method: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface IProject extends Document {
  name: string;
  description: string;
  apiKey: string;
  userId: Types.ObjectId;
  errorRefs: Types.ObjectId[];
}
