import express from "express"
import { createUserController } from "../controllers/create-user-controller";
import { getSingleUserController } from "../controllers/getSingleUserController";

const router__User = express.Router();


router__User.post("/",createUserController)
router__User.get("/:id",getSingleUserController)
export default router__User;