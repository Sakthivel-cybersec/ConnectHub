require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the API server
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`ConnectHub API running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("HTTP server failed:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      console.log("HTTP server and MongoDB connection closed.");
      process.exit(0);
    });
  } else {
    await mongoose.connection.close();
    process.exit(0);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

startServer();
