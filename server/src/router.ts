import express from "express"
import router__User from "./routes/User";
import router__Faucet from "./routes/Faucet";
const router = express.Router();


router.use("/users",router__User)
router.use("/faucets",router__Faucet)
export default router;