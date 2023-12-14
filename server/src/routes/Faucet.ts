import express from "express"
import { claimFaucetsController } from "../controllers/claim-faucets-controller";
import { authenticated } from "../middlewares/authenticated";

/**
 * @dev Roteador para todos os endpoints de usuário
 */
const router__Faucet = express.Router();

router__Faucet.post("/",authenticated,claimFaucetsController)

export default router__Faucet;