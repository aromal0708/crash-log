// Description: Global types for the application.

import { Request } from "express";


// Define global interfaces for user and authRequest
interface user {
  _id: string;
  name: string;
  email: string;
}
 
interface authRequest extends Request {
    user?: user;
}