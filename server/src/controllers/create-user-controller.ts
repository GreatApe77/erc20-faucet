import { NextFunction, Request, Response } from 'express';
import { createUserRepository } from '../repositories/create-user-repository';
import {ethers } from "ethers"
import { TypeUser } from '../@types/User';
import User from '../models/User';
export async function createUserController(req: Request, res: Response,next:NextFunction) {
    try {
        const user = req.body as TypeUser;
        const wallet = ethers.Wallet.createRandom();
        user.custodyAccountPrivateKey = wallet.privateKey
        user.custodyAccountPublicKey = wallet.address.toLowerCase()
        user.lastClaimed = 0
        user.nextClaim = 0
        const userExists = await User.findOne({nickname:user.nickname})
        if(userExists?.nickname){
            return res.status(400).json({
                message: "User already exists",
            });
        }
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
        console.error(error)
        next(error);
    }
}