import { NextFunction, Request, Response } from "express";
import { getSingleUserRepository } from "../repositories/get-single-user-Repository";
import { ethers } from "ethers";
import { TypeUser } from "../@types/User";
export async function getSingleUserController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let id = req.params.id;
        
		if ( id.startsWith("0x") ||ethers.isAddress(id)) {
            console.log("isAddress")
            id = id.toLowerCase();
		
        }
        
		const userFound = await getSingleUserRepository(id);
        //console.log(userFound)
		return res.status(200).json({
			message: "User found successfully",
			data: {
				_id: userFound!._id,
				nickname: userFound!.nickname,
				custodyAccountPublicKey: userFound!.custodyAccountPublicKey,
				lastClaimed: userFound!.lastClaimed,
				nextClaim: userFound!.nextClaim,
			},
		});
	} catch (error) {
		return next(error);
	}
}
