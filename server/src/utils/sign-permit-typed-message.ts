import {JsonRpcSigner, ethers} from "ethers"
import { greatApe77CoinInstance } from "../config/web3-services";
export type SigningParams ={
    
    spender:string,
    amount:string,
    deadline:string

}

export async function signPermitTypedMessage(
    signer:JsonRpcSigner,
    params:SigningParams,

    ){
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
        const values = {
            owner: signer.address,
            spender: params.spender,
            value: params.amount
            nonce: await greatApe77CoinInstance.nonces(signer.address),
            deadline: deadline
        }
    }