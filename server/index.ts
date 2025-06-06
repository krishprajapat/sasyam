import express from "express";
import cors from "cors";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { registerRoutes } from "./routes.js";
import { storage } from "./storage.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Logging middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
  }
);

// Initialize application
let server: any;

async function init() {
  try {
    server = await registerRoutes(app);
    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
}

// Serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    await init();
  }

  // Handle API routes
  if (req.url?.startsWith("/api")) {
    return app(req, res);
  }

  // Handle frontend routes
  res.status(200).json({
    message: "Welcome to SAS Yamrita Organics API",
    status: "online",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      contacts: "/api/contacts",
      auth: "/api/auth",
    },
  });
}

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  init().then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}
