import { NextFunction, Request, Response } from "express";
import { TypeUser } from "../@types/User";
import { allowance } from "../services/allowance";
import { wallet } from "../config/web3-services";
import { transferFrom } from "../services/transferFrom";

export async function metamaskController(req:Request,res:Response){
    const userCredentials = req.body.userCredentials as TypeUser;
    const metamaskWallet = req.params.wallet as string
    const ownerWallet = userCredentials.custodyAccountPublicKey as string
    const spender = wallet.address
    const currentAllowance = await allowance(ownerWallet,spender)
    try {
        const response = await transferFrom(ownerWallet,metamaskWallet,currentAllowance)
        return res.status(200).json({
            message:"Tokens Transferred",
            transactionHash:response.hash
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}