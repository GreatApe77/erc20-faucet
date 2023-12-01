import express from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./router";
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors())
app.use(router)

export default app;