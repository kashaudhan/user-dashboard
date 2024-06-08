import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes"
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())

app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});