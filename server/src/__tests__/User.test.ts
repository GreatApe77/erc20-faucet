/*import User from "../src/models/User";
import { ethers } from "ethers";

describe("User", () => {
	it("should create a new user", async () => {
        const wallet = ethers.Wallet.createRandom();
		const user = await User.create({
            nickname: "testName",
            password: "abc123",
            custodyAccountPublicKey: wallet.address,
            custodyAccountPrivateKey: wallet.privateKey,

        });
        expect(user.nickname).toBe("testName");
        expect(user.password).toBe("abc123");
        expect(user.custodyAccountPublicKey).toBe(wallet.address);
        expect(user.custodyAccountPrivateKey).toBe(wallet.privateKey);
	});
});
*/