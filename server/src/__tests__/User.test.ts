import User from "../models/User";
import { ethers } from "ethers";
import { NEXTCLAIM } from "./utils/constants";
import crypto from "crypto"
function getCurrentTimeStamp() {
    return Math.floor(Date.now() / 1000)
}
describe("User", () => {
	it("should create a new user", async () => {
		const wallet = ethers.Wallet.createRandom();
		const user = new User({
			nickname: "testName",
			password: "abc123",
			custodyAccountPublicKey: wallet.address,
			custodyAccountPrivateKey: wallet.privateKey,
			lastClaimed: 0,
			nextClaim: NEXTCLAIM,
		});
		expect(user.nickname).toBe("testName");
		expect(user.password).toBe("abc123");
		expect(user.custodyAccountPublicKey).toBe(wallet.address);
		expect(user.custodyAccountPrivateKey).toBe(wallet.privateKey);
	});
    it("should update a user last claimed", async () => {
        const wallet = ethers.Wallet.createRandom();
        const user = new User({
            nickname: "testName",
            password: "abc123",
            custodyAccountPublicKey: wallet.address,
            custodyAccountPrivateKey: wallet.privateKey,
            lastClaimed: 0,
            nextClaim: NEXTCLAIM,
        });
        user.lastClaimed = getCurrentTimeStamp()
        expect(user.lastClaimed!==0).toBe(true)
    })
    it("should encrypt a user private key before creating user ", async () => {

    })
});
