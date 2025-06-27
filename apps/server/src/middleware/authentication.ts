import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../jwt";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decoded = verifyJwtToken(token);
    if (!(decoded as any).userId) {
      throw new Error("Authentication failed");
    }

    if ((decoded as any).userId) {
      // @ts-ignore
      req.userId = (decoded as any).userId as string;
      next();
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.log(error, "middleware error");
    res.status(500).json({ message: "errror" });
    return;
  }
};
