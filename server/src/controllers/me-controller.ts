import { Request, Response, NextFunction } from "express";
import { getSingleUserRepository } from "../repositories/get-single-user-Repository";
export async function meController(req: Request, res: Response,next:NextFunction) {
    const userCredentials = req.body.userCredentials
    const id = userCredentials.id
    const loggedUser = await getSingleUserRepository(id)
    if(!loggedUser){
        return res.status(404).json({
            message: "User not found",
        });
    }
    return res.status(200).json({
        message: "User found",
        data: {
            _id: loggedUser._id,
            nickname: loggedUser.nickname,
            custodyAccountPublicKey: loggedUser.custodyAccountPublicKey,
            lastClaimed: loggedUser.lastClaimed,
            nextClaim: loggedUser.nextClaim,
        },
    });

}