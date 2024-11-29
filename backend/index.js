const express = require("express");
const connectDB = require("./connectDB");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const path = require("path");

class Server {
  app = express();

  async initialize() {
    await connectDB();

    // Middleware
    this.app.use(cors({ origin: "*" }));

    // API Routes
    this.app.use("/api", userRouter);

    // Serve Frontend in Production
    if (process.env.NODE_ENV === "production") {
      const __dirname1 = path.resolve("");
      this.app.use(express.static(path.join(__dirname1, "../frontend/dist")));

      // Serve index.html for non-API routes
      this.app.get("*", (req, res) => {
        if (!req.originalUrl.startsWith("/api")) {
          res.sendFile(path.resolve(path.join(__dirname1, "../frontend/dist/index.html")));
        }
      });
    }

    // Handle unknown routes
    this.app.all("*", (req, res) => {
      return res.status(404).json({ message: `Cannot find route ${req.originalUrl}` });
    });

    // Start Server
    this.app.listen(3000, () => console.log("App is listening on port 3000"));
  }
}

const server = new Server();
server.initialize();
