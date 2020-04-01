//require('crypto').randomBytes(64).toString('hex')
const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const registrationRouter = require("./routes/registration");
const postsRouter = require("./routes/posts");
const mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use("/auth", authRouter);
app.use("/registration", registrationRouter);
app.use("/posts", postsRouter);

mongoose.connect(process.env.LOCAL_DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.listen(PORT, () => console.log("Express server up and running"));
