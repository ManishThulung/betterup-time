import { prismaClient } from "@repo/db/prismaClient";
import express, { Request, Response } from "express";

const app = express();
const PORT = 4000;

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

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany();

    if (!users) {
      res.status(404).json({ error: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/website", async (req: Request, res: Response) => {
  const { url, title } = req.body;
  try {
    const website = await prismaClient.website.create({
      data: {
        url,
        title,
        userId: "cmbmmz64k0000ki55x8lk7t0x",
      },
    });
    res.status(201).json(website);
  } catch (error: any) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/website/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Website ID is required" });
  }
  try {
    const website = await prismaClient.website.findUnique({
      where: { id },
    });
    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return;
    }
    res.status(200).json(website);
  } catch (error) {
    console.error("Error fetching website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
