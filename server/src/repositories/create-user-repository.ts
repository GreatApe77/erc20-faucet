import mongoose from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

/**
 * @dev Cria um usuário no banco de dados
 * @param user Usuário a ser criado
 * @returns Usuário criado
 */
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