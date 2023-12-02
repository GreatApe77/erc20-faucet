import { ethers } from "ethers";
import dotenv from "dotenv";
import {
	ERC20_TOKEN_CONTRACT_ADDRESS,
	FAUCET_BANK_CONTRACT_ADDRESS,
} from "./contract-connection";
import { FaucetBank, GreatApe77Coin } from "../contract-types";
dotenv.config();

/**
 * @dev Provedor de conexão com a rede Ethereum ex: Infura
 */
const provider = new ethers.JsonRpcProvider(`${process.env.RPC_URL}`);

/**
 * @dev Carteira que assinará as transações. ADMIN do FaucetBank
 */
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY_ADMIN}`, provider);

/**
 * @dev Instância do contrato FaucetBank tipada pelos tipos gerados pelo plugin typechain
 */
const faucetBankInstance = new ethers.Contract(
	FAUCET_BANK_CONTRACT_ADDRESS,
	require("../abis/FaucetBank.json"),
	wallet
) as unknown as FaucetBank;
/**
 * @dev Instância do contrato GreatApe77Coin tipada pelos tipos gerados pelo plugin typechain
 */
const greatApe77CoinInstance = new ethers.Contract(
	ERC20_TOKEN_CONTRACT_ADDRESS,
	require("../abis/GreatApe77Coin.json"),
	wallet
) as unknown as GreatApe77Coin;


export {
    provider,
    wallet,
    faucetBankInstance,
    greatApe77CoinInstance
}