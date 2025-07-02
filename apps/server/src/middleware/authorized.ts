import { NextFunction, Request, Response } from "express";
import { UserRole } from "@repo/db/prisma/client";

export const authorized =
  (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = req.user;
      if (user && roles.includes(user.role)) {
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
