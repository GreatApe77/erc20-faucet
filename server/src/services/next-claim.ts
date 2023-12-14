import { faucetBankInstance } from "../config/web3-services";

export async function nextClaim(address:string){
    const nextClaim= await faucetBankInstance.nextClaim(address)
    return Number(nextClaim)
}