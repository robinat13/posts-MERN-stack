//require('crypto').randomBytes(64).toString('hex')
const express = require("express");
const jwt = require("jsonwebtoken");
const loginRouter = require("./routes/login");
const registrationRouter = require("./routes/registration");
const postsRouter = require("./routes/posts");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use("/registration", registrationRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);

mongoose.connect(process.env.LOCAL_DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.listen(PORT, () => console.log("Express server up and running"));
