import { ethers } from "ethers";
import dotenv from "dotenv";
import {
	ERC20_TOKEN_CONTRACT_ADDRESS,
	FAUCET_BANK_CONTRACT_ADDRESS,
} from "./contract-connection";
import { FaucetBank__factory,GreatApe77Coin__factory } from "../typechain-types";
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
const faucetBankInstance = FaucetBank__factory.connect(FAUCET_BANK_CONTRACT_ADDRESS,wallet)

/**
 * @dev Instância do contrato GreatApe77Coin tipada pelos tipos gerados pelo plugin typechain
 */
const greatApe77CoinInstance = GreatApe77Coin__factory.connect(ERC20_TOKEN_CONTRACT_ADDRESS,wallet)


export {
    provider,
    wallet,
    faucetBankInstance,
    greatApe77CoinInstance
}