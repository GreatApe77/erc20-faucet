import { ethers } from "ethers";
import dotenv from "dotenv";
import {
	ERC20_TOKEN_CONTRACT_ADDRESS,
	FAUCET_BANK_CONTRACT_ADDRESS,
} from "./contract-connection";
import { FaucetBank, GreatApe77Coin } from "../contract-types";

dotenv.config();
const provider = new ethers.JsonRpcProvider(`${process.env.RPC_URL}`);

const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const faucetBank = new ethers.Contract(
	FAUCET_BANK_CONTRACT_ADDRESS,
	require("../abis/FaucetBank.json"),
	wallet
) as unknown as FaucetBank;
const greatApe77Coin = new ethers.Contract(
	ERC20_TOKEN_CONTRACT_ADDRESS,
	require("../abis/GreatApe77Coin.json"),
	wallet
) as unknown as GreatApe77Coin;


faucetBank.owner().then((owner) => {
    console.log("Faucet Bank owner:", owner);
}
);
