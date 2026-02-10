// src/config/database.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/parbar_baghestan");
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("📦 MongoDB Disconnected");
  } catch (error) {
    console.error("❌ MongoDB Disconnection Error:", error);
  }
};