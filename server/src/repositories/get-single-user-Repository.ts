import mongoose from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

export async function getSingleUserRepository(user: TypeUser) {
	const userFound = await User.findOne(
		{
			$or: [
				{ nickname: user.nickname },
				{ custodyAccountPublicKey: user.custodyAccountPublicKey },
				{ _id: user._id },
			],
		},
		"-password -custodyAccountPrivateKey -__v"
	);
	return userFound;
}
