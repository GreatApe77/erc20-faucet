import express from "express"
import { createUserController } from "../controllers/create-user-controller";
import { getSingleUserController } from "../controllers/getSingleUserController";

import { getUsersController } from "../controllers/get-users-controller";
import { hashPasswordCreation } from "../middlewares/hash-password-creation";
import { loginController } from "../controllers/login-controller";
/**
 * @dev Roteador para todos os endpoints de usuário
 */
const router__User = express.Router();


router__User.post("/register",hashPasswordCreation,createUserController)
router__User.post("/login",loginController)
router__User.get("/:id",getSingleUserController)
router__User.get("/",getUsersController)
export default router__User;