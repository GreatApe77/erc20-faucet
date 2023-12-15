import { NextFunction, Request, Response } from 'express';
import { claimFaucets } from '../services/claim-faucets';
import { ethers } from 'ethers';

import {  nextClaim } from '../services/next-claim';
export async function claimFaucetsController(req: Request, res: Response,next:NextFunction) {
    
    let address:string

    if(req.query.address){
        address = req.query.address as string
    }else{
        address = req.body.userCredentials.custodyAccountPublicKey
    }
    
    console.log(address)
    if(!ethers.isAddress(address)){
        return res.status(400).json({
            message: "Invalid address"
        })
    }
    const nextClaimTimeStamp = await nextClaim(address)
    const now = Date.now()/1000
    if(now<nextClaimTimeStamp){
        return res.status(400).json({
            message: "You can't claim yet",
            nextClaim: nextClaimTimeStamp
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