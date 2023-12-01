import express from "express"
import { createUserController } from "../controllers/create-user-controller";
import { getSingleUserController } from "../controllers/getSingleUserController";

import { getUsersController } from "../controllers/get-users-controller";

const router__User = express.Router();


router__User.post("/",createUserController)
router__User.get("/:id",getSingleUserController)
router__User.get("/",getUsersController)
export default router__User;