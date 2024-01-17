import { AddressLike, BigNumberish } from "ethers";
import { greatApe77CoinInstance } from "../config/web3-services";

export async function transferFrom(from:AddressLike,to:AddressLike,amount:BigNumberish){
    const response = await greatApe77CoinInstance.transferFrom(from,to,amount)
    return response
}