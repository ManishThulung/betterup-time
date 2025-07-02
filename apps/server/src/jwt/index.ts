import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserRole } from "@repo/db/prisma/client";

export const signJwtToken = (userId: string, role: UserRole) => {
  return jwt.sign({ userId, role }, JWT_SECRET);
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
