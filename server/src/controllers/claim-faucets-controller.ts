import { NextFunction, Request, Response } from 'express';
import { claimFaucets } from '../services/claim-faucets';
import { ethers } from 'ethers';
export async function claimFaucetsController(req: Request, res: Response,next:NextFunction) {
    const address = req.params.address
    if(!ethers.isAddress(address)){
        return res.status(400).json({
            message: "Invalid address"
        })
    }
    try {
        const response = await claimFaucets(address)
        res.status(200).json({
            message: "Faucets claimed successfully",
            transactionHash: response.hash,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}