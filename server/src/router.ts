import express from "express"
import router__User from "./routes/User";
import router__Faucet from "./routes/Faucet";
import router__Permit from "./routes/Permit";
const router = express.Router();


router.use("/users",router__User)
router.use("/faucets",router__Faucet)
router.use("/permit",router__Permit)
export default router;