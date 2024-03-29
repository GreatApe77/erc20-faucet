import {JsonRpcSigner, Wallet, ethers} from "ethers"
import { greatApe77CoinInstance } from "../config/web3-services";
export type SigningParams ={
    
    spender:string,
    amount:bigint,
    deadline:number

}
/**
 * @dev Assina uma mensagem tipada com os parametros
 * @param signer Conta do owner dos tokens que assinará a aprovacao offchain
 * @param params Parametros de assinatura
 * @returns A assinatura para ser decomposta e validada
 */
export async function signPermitTypedMessage(
    signer:JsonRpcSigner,
    wallet:Wallet,
    params:SigningParams,

    ){
        console.log(params)
        const types = {
            Permit: [{
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
        };
        const network = await signer.provider.getNetwork()
        const domain = {
            name: await greatApe77CoinInstance.name(),
            version: "1",
            chainId: network.chainId,
            verifyingContract: await greatApe77CoinInstance.getAddress()

        }
        const nonce = await greatApe77CoinInstance.nonces(signer.address)
        console.log({nonce})
        const values = {
            owner: signer.address,
            spender: params.spender,
            value: params.amount,
            nonce: nonce,
            deadline: params.deadline
        }
        console.log({domain,values})
        
        const signature = await wallet.signTypedData(domain,types,values)
        return signature
    }