//core Module
const path = require("path");

// External Module

const express = require("express");

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
//Local Module
const rootdir = require("./utils/pathUtil");
const errorsController = require("./controllers/error");

const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootdir, "public")));
app.use((req, res, next) => {
  console.log("cookie check middleware", req.get("Cookie"));
  req.isLoggedIn = req.get("Cookie")
    ? req.get("Cookie").split("=")[1] === "true"
    : false;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;
const DB_PATH =
  "mongodb+srv://Rajan:Rajan@rajancoding.hthpzj0.mongodb.net/airbnb?retryWrites=true&w=majority&appName=RajanCoding";
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo:", err);
  });
