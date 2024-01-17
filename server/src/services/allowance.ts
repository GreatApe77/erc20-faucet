import { AddressLike } from "ethers";
import { greatApe77CoinInstance } from "../config/web3-services";

export async function allowance(owner:AddressLike,spender:AddressLike){
    const response = await greatApe77CoinInstance.allowance(owner,spender)
    return response
}