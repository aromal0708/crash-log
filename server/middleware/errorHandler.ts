import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.text(`[Error] ${err.message}`);

  res.status(50).json({ error: "Something went wrong" });
};
