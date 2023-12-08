import { Request, Response, NextFunction } from "express";
import { ethers } from "ethers";
import { hash,compare } from "bcrypt";
export async function hashPasswordCreation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const password = req.body.password as string;
        const condidition = typeof(password)==="string" && password.length >= 8 
		if (!condidition) {
			return res.status(400).json({
				message: "Password is required",
			});
		}
        
        const hashedPassword = await hash(password,10)
        req.body.password = hashedPassword
        next();
	} catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}
