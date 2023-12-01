import express from "express"
import { createUserController } from "../controllers/create-user-controller";

const router__User = express.Router();


router__User.post("/",createUserController)

export default router__User;