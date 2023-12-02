import {ethers} from "ethers"
import dotenv from "dotenv"
import { FAUCET_BANK_ABI,FAUCET_BANK_CONTRACT_ADDRESS,ERC20_TOKEN_ABI,ERC20_TOKEN_CONTRACT_ADDRESS } from "./contract-connection"
dotenv.config()
const provider = new ethers.JsonRpcProvider(`${process.env.RPC_URL}`)

const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider)

