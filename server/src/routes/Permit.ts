import express from "express"

import { authenticated } from "../middlewares/authenticated";
import { permitController } from "../controllers/permit-controller";


const router__Permit = express.Router();

router__Permit.post("/",authenticated,permitController)

export default router__Permit;