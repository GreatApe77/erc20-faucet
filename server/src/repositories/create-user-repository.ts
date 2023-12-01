import mongoose from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

export async function createUserRepository(user: TypeUser){

    const newUser = new User({
        nickname: user.nickname,
        password: user.password,
        custodyAccountPublicKey: user.custodyAccountPublicKey,
        custodyAccountPrivateKey: user.custodyAccountPrivateKey,
        lastClaimed: user.lastClaimed,
        nextClaim: user.nextClaim,
    }as TypeUser);
    await newUser.save()
    return newUser
}