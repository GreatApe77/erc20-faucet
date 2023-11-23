import {
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20", () => {
    async function deployERC20Fixture() {
        const accounts = await ethers.getSigners();
        const ERC20Factory = await ethers.getContractFactory("DummyERC20");
        const erc20 = await ERC20Factory.deploy("Dummy ERC20", "DERC20", 18,ethers.parseEther("777"));
        return { erc20, accounts };
    }

    it("should set name, symbol, decimals", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const expectedName = "Dummy ERC20";
        const expectedSymbol = "DERC20";
        const expectedDecimals = 18;
        const currentName = await erc20.name();
        const currentSymbol = await erc20.symbol();
        const currentDecimals = await erc20.decimals();
        expect(currentName).to.be.equal(expectedName);
        expect(currentSymbol).to.be.equal(expectedSymbol);
        expect(currentDecimals).to.be.equal(expectedDecimals);
    });
    it("should check total supply", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const expectedTotalSupply = ethers.parseEther("777");
        const currentTotalSupply = await erc20.totalSupply();
        expect(currentTotalSupply).to.be.equal(expectedTotalSupply);
    })
    it("should check balanceOf", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const expectedBalance = ethers.parseEther("777");
        const currentBalance = await erc20.balanceOf(accounts[0].address);
        expect(currentBalance).to.be.equal(expectedBalance);
    })
    it("should transfer", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const recipient = accounts[1].address;
        const amount = ethers.parseEther("777");
        await erc20.transfer(recipient,amount);
        const expectedBalance = ethers.parseEther("777");
        const currentBalance = await erc20.balanceOf(recipient);
        const remeterBalance = await erc20.balanceOf(accounts[0].address);
        expect(remeterBalance).to.be.equal(0);
        expect(currentBalance).to.be.equal(expectedBalance);
    })
})