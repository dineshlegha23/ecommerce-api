const connectDB = require("./config/db");
require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");

const authRouter = require("./routes/authRoutes");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "success" });
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
