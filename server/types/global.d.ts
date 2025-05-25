import { Request } from "express";

interface user {
  _id: string;
  name: string;
  email: string;
}
 
interface authRequest extends Request {
    user?: user;
}