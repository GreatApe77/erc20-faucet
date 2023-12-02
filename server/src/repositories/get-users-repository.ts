import User from "../models/User";

/**
 * @dev Busca usuários no banco de dados
 * @param page Número da página
 * @param pageSize Tamanho da página de busca
 * @returns Usuários encontrados
 */
export async function getUsersRepository(page = 1, pageSize = 10) {
	const skip = (page - 1) * pageSize;

	const usersFound = await User.find(
		{},
		"-password -custodyAccountPrivateKey -__v"
	)
		.skip(skip)
		.limit(pageSize);

	return usersFound;
}
