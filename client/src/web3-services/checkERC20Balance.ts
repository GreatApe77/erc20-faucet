
import { ethers } from "ethers";
import { PUBLIC_RPC_URL } from "../constants/public-rpc-url";
import { GreatApe77Coin__factory } from "../typechain-types";
import { GREAT_APE_77_COIN_ADDRESS } from "../constants/erc-address";
export async function checkERC20Balance(targetAddress: string){
    const provider = new ethers.JsonRpcProvider(PUBLIC_RPC_URL)
    const contract = GreatApe77Coin__factory.connect(GREAT_APE_77_COIN_ADDRESS, provider)
    const balance = await contract.balanceOf(targetAddress)
    return balance
}