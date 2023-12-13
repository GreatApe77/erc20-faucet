import express from "express"
import { claimFaucetsController } from "../controllers/claim-faucets-controller";

/**
 * @dev Roteador para todos os endpoints de usuário
 */
const router__Faucet = express.Router();

router__Faucet.post("/",claimFaucetsController)

export default router__Faucet;