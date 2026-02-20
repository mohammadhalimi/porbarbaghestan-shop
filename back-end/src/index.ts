// src/index.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { initUploadDirectories } from './utils/initUploadDirs';
// import { createInitialAdmin } from './services/admin.service';
import adminRoutes from "./routes/admin/admin.routes";
import profileRoutes from "./routes/admin/profile.routes"
import productRoutes from "./routes/admin/product.routes";
import path from 'path';
import blogRoutes from "./routes/admin/blog.routes";
import publicBlogRoutes from './routes/public/blog.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/admin/profile', profileRoutes)
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/blog', blogRoutes);
app.use('/api/blog', publicBlogRoutes);

// Health Check Route
app.get("/api/health", (_req,res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// Default route
app.get("/", (_req,res) => {
  res.json({
    message: "Welcome to Parbar Baghestan API",
    version: "1.0.0",
    documentation: "/api/docs",
  });
});

// Start Server with Database Connection
const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Base URL: ${process.env.BASE_URL}`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};
initUploadDirectories();
// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});