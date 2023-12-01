import User from "../models/User";

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
