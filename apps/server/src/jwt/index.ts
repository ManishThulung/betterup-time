import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const signJwtToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
