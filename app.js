const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// LwdLqgwPv2gs84A
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Anna:LwdLqgwPv2gs84A@cluster0.a4jpjiq.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    return console.log("Database connection successful");
  })

  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
// 88888

const contactsRouter = require("./routes/contactsRouter");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });
