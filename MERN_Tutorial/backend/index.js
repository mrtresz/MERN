import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     aloowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
