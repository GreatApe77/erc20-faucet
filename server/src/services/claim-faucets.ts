import { faucetBankInstance } from "../config/web3-services";

export async function claimFaucets(address:string){
    try {
        const response = await faucetBankInstance.claimFaucets(address)
        
        return response
    } catch (error) {
        console.error(error)
        throw new Error("Error in claim faucets")
    }
}