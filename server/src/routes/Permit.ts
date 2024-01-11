import express from "express"

import { authenticated } from "../middlewares/authenticated";


const router__Permit = express.Router();

router__Permit.post("/")

export default router__Permit;