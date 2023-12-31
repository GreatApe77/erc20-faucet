import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-docgen";
import dotenv from "dotenv"
dotenv.config()
const config: HardhatUserConfig = {
	solidity: { compilers: [{ version: "0.8.20" }] },
  networks:{
    fantomTestnet:{
      url:`${process.env.FANTOM_TESTNET_RPC_URL}`,
      chainId:4002,
      accounts:{
        mnemonic:`${process.env.MNEMONIC}`
      }
    }
  },
  etherscan:{
    apiKey:`${process.env.ETHERSCAN_API_KEY}`
  }
};

export default config;
