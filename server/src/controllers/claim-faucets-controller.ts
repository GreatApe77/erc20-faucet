import { NextFunction, Request, Response } from 'express';
import { claimFaucets } from '../services/claim-faucets';
import { ethers } from 'ethers';
import jwt from "jsonwebtoken"
import { TypeUser } from '../@types/User';
export async function claimFaucetsController(req: Request, res: Response,next:NextFunction) {
    
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(400).json({
            message: "No token provided"
        })
    }

    const userCredentials =  jwt.verify(token,`${process.env.JWT_SECRET}`) as TypeUser
    const address = userCredentials.custodyAccountPublicKey
    console.log(address)
    if(!ethers.isAddress(address)){
        return res.status(400).json({
            message: "Invalid address"
        })
    }
    try {
        const response = await claimFaucets(address)
        res.status(200).json({
            message: "Faucets claimed successfully",
            target: address,
            transactionHash: response.hash,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}