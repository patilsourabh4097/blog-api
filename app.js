const cors = require("cors");
const dotEnv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth-route");
const commentRoute = require("./routes/comment-route");
const postsRoute = require("./routes/post-route");
const userRoute = require("./routes/user-route");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/post", commentRoute);
app.use("/post", postsRoute);
app.use("/user", userRoute);

dotEnv.config();

const MONGODB = process.env.MONGODB;
mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.json({
    success: "Connected",
  });
});

app.listen(PORT, () => {
  console.log(`Listning on ${PORT}`);
});
