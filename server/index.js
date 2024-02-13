import express from "express";
import cors from "cors";
import { getSubs } from "./controller/subsController.js";

const app = express();
app.use(cors());
app.use(express.json())

app.get('/subs', getSubs);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`app listen on port: ${PORT}`)
});