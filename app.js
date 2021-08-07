const cors = require("cors");
let dotEnv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const authRoute = require("./routes/auth-route");
const commentRoute = require("./routes/comment-route");
const postsRoute = require("./routes/post-route");
const userRoute = require("./routes/user-route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/comment", commentRoute);
app.use("/api/post", postsRoute);
app.use("/api/user", userRoute);

dotEnv.config();

let MONGODB = process.env.MONGODB;
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
