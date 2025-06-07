import { prismaClient } from "@repo/db/prismaClient";
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/user", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await prismaClient.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      res.status(409).json({ error: "Email already in use" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/website", (req: Request, res: Response) => {
  res.status(200).send("Website endpoint hit");
});

app.get("/api/website/:status", (req: Request, res: Response) => {
  res.status(200).send(`Website status: ${req.params.status}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
