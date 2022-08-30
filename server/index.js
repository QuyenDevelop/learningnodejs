const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DP_USERNAME}:${process.env.DB_PASSWORD}@leaning-nodejs.y5cabsh.mongodb.net/leaning-nodejs?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    console.log("Connected to MongoDB");
  } catch (error) {
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = 5000; //port number

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
