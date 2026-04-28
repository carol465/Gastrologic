import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 3001,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL,
};