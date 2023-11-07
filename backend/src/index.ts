import express, { Application } from "express";
import { sequelize } from "./instances/sequelize";

const app: Application = express();
const port = 8000;

app.get("/", (req, res, next) => {
  res.json("Hello world");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
