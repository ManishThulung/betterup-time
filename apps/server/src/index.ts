import { authenticated } from "./middleware/authenticated";
import { prismaClient } from "@repo/db/prismaClient";
import express, { Request, Response } from "express";
import { compareData, hashData } from "./hash";
import { configDotenv } from "dotenv";
import { signJwtToken } from "./jwt";
import cors from "cors";
import { authorized } from "./middleware/authorized";
import { UserRole } from "@repo/db/prisma/client";

configDotenv();

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3001"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/auth/sign-up", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const hashedPassword = await hashData(password);

  try {
    await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/sign-in", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await compareData(password, user.password);
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const token = signJwtToken(user.id, user.role);

    res.status(200).json({
      success: true,
      message: "User signin successfully",
      data: { token },
    });
    return;
  } catch (error: any) {
    console.error("Error signin user:", error);

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

app.post("/api/website", authenticated, async (req: any, res: Response) => {
  const { url, title } = req.body;
  try {
    const website = await prismaClient.website.create({
      data: {
        url,
        title,
        userId: req?.user.userId.toString(),
      },
    });
    res.status(201).json({ data: website });
    return;
  } catch (error: any) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/website", authenticated, async (req: any, res: Response) => {
  try {
    const websites = await prismaClient.website.findMany({
      where: {
        userId: req?.user.userId.toString(),
      },
    });
    res.status(200).json({ data: websites });
    return;
  } catch (error: any) {
    console.error("Error getting website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get(
  "/api/admin/website",
  authenticated,
  authorized([UserRole.ADMIN]),
  async (req: any, res: Response) => {
    try {
      const websites = await prismaClient.website.findMany({
        include: {
          user: { select: { id: true, name: true } },
        },
      });
      res.status(200).json({ data: websites });
      return;
    } catch (error: any) {
      console.error("Error getting website:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/api/website/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Website ID is required" });
    return;
  }
  try {
    const website = await prismaClient.website.findUnique({
      where: { id },
    });
    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return;
    }
    res.status(200).json({ data: website });
  } catch (error) {
    console.error("Error fetching website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
