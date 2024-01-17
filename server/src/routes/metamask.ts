import express from "express"

import { authenticated } from "../middlewares/authenticated";
import {  metamaskController} from "../controllers/metamask-controller";


const router__Metamask = express.Router();

router__Metamask.post("/:wallet",authenticated,metamaskController)

export default router__Metamask;