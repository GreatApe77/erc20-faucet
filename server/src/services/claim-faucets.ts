import { faucetBankInstance } from "../config/web3-services";

/**
 * Resgata os faucets para um endereço.
 * 
 * @param address - Endereço para o qual os faucets serão resgatados.
 * @returns uma Promise de um objeto com a hash da transação.
 * @throws um erro caso ocorra algum problema na transação.
 */
export async function claimFaucets(address:string){
    try {
        const response = await faucetBankInstance.claimFaucets(address)
        
        return response
    } catch (error) {
        console.error(error)
        throw new Error("Error in claim faucets")
    }
}