import express from "express"
import router__User from "./routes/User";
const router = express.Router();


router.use("/users",router__User)

export default router;