import { Request, Response, NextFunction } from "express";
import { getSingleUserRepository } from "../repositories/get-single-user-Repository";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
export async function loginController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { nickname, password } = req.body;
	const condition =
		typeof nickname === "string" &&
		typeof password === "string" &&
		nickname.length > 0 &&
		password.length >= 8;
	if (!condition) {
		return res.status(400).json({
			message: "Invalid nickname or password",
		});
	}
	try {
		const user = await getSingleUserRepository(nickname);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
        
		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({
				message: "Wrong password",
			});
		}
		const token = jwt.sign(
			{
				id: user.id,
                nickname: user.nickname,
                lastClaimed: user.lastClaimed,
                nextClaim: user.nextClaim,
				custodyAccountPrivateKey: user.custodyAccountPrivateKey,
				custodyAccountPublicKey: user.custodyAccountPublicKey,
			},
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "30d" }
		);
        return res.status(200).json({
            message: "Login successful",
            token,
        });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
}
