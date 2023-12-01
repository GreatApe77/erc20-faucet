import { NextFunction, Request, Response } from 'express';
import { createUserRepository } from '../repositories/create-user-repository';
import {ethers } from "ethers"
import { TypeUser } from '../@types/User';
export async function createUserController(req: Request, res: Response,next:NextFunction) {
    try {
        const user = req.body as TypeUser;
        const wallet = ethers.Wallet.createRandom();
        user.custodyAccountPrivateKey = wallet.privateKey
        user.custodyAccountPublicKey = wallet.address
        user.lastClaimed = 0
        user.nextClaim = 0

        const newUser = await createUserRepository(user);
        res.status(201).json({
            message: "User created successfully",
            data: {
                _id: newUser._id,
                nickname: newUser.nickname,
                custodyAccountPublicKey: newUser.custodyAccountPublicKey,
                lastClaimed: newUser.lastClaimed,
                nextClaim: newUser.nextClaim,
            },
        });
    } catch (error) {
        next(error);
    }
}