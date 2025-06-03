// Description: Types for the schema definitions in the application.
// This file defines the interfaces for User, Error, and Project models used in the application.

// Import necessary modules
import { BooleanExpression, Document, Types } from "mongoose";


//Define the interface for the User model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  projects: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the interface for the Error model
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
  resolved?:boolean
}

// Define the interface for the Project model
export interface IProject extends Document {
  name: string;
  description: string;
  apiKey: string;
  userId: Types.ObjectId;
  errorRefs: Types.ObjectId[];
}
