import {
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ownable", () => {
	async function deployOwnableFixture() {
		const accounts = await ethers.getSigners();
		const OwnableFactory = await ethers.getContractFactory("Ownable");
		const ownable = await OwnableFactory.deploy();
		return { ownable, accounts };
	}

	it("should set owner to deployer", async () => {
		const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        const expectedOwner = accounts[0].address;
        const currentOwner = await ownable.owner();
        expect(currentOwner).to.be.equal(expectedOwner);
	});
    it("should transfer ownership", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        const newOwner = accounts[1].address;
        await ownable.transferOwnership(newOwner);
        const currentOwner = await ownable.owner();
        expect(currentOwner).to.be.equal(newOwner);
    })
    it("should not transfer ownership (not owner)", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        const newOwner = accounts[1].address;
        await expect(ownable.connect(accounts[1]).transferOwnership(newOwner)).to.be.revertedWithCustomError(ownable,"Ownable__notOwner")
    })
    it("should not transfer ownership (address(0))", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        expect(ownable.transferOwnership(ethers.ZeroAddress)).to.be.revertedWithCustomError(ownable,"Ownable__newOwnerZeroAddress")
    })
    it("should not transfer ownership (same owner)", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        expect(ownable.transferOwnership(accounts[0].address)).to.be.revertedWithCustomError(ownable,"Ownable__newOwnerSameAsCurrentOwner")
    })
    it("should renounce ownership", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        await ownable.renounceOwnership();
        const currentOwner = await ownable.owner();
        expect(currentOwner).to.be.equal(ethers.ZeroAddress);
    })
    it("should not renounce ownership (not owner)", async () => {
        const { ownable, accounts } = await loadFixture(deployOwnableFixture);
        await expect(ownable.connect(accounts[1]).renounceOwnership()).to.be.revertedWithCustomError(ownable,"Ownable__notOwner")
    })
});
