import mongoose from "mongoose";
import { Types } from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

/**
 * @dev Cria um usuário no banco de dados
 * @param id Identificador do usuário ex: _id, nickname, custodyAccountPublicKey
 * @returns Usuário encontrado
 */
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
