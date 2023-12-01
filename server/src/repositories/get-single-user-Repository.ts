import mongoose from "mongoose";
import { Types } from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

export async function getSingleUserRepository(id: string) {
	let query;

	if (Types.ObjectId.isValid(id)) {
		query = { _id: id };
	} else {
		query = {
			$or: [{ nickname: id }, { custodyAccountPublicKey: id }],
		};
	}
    
	const userFound = await User.findOne(
		query,
		"-password -custodyAccountPrivateKey -__v"
	);
	return userFound;
}
