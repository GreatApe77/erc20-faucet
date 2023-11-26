import {
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";


describe("FaucetBank", () => {
    async function deployERC20Fixture() {
        const accounts = await ethers.getSigners();
        const ERC20Factory = await ethers.getContractFactory("DummyERC20");
        const erc20 = await ERC20Factory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"),accounts[0].address);
        return { erc20, accounts };
    }
    async function deployFaucetBankFixture() {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const erc20Address = await erc20.getAddress()
        const FaucetBankFactory = await ethers.getContractFactory("FaucetBank");
        const faucetBank = await FaucetBankFactory.deploy(erc20Address);
        return { faucetBank, accounts,erc20 };
    }
    it("should set erc20 address", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const DummyERC20Factory = await ethers.getContractFactory("DummyERC20")
        const newDummyERC20 = await DummyERC20Factory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"),accounts[0].address);
        const newDummyERC20Address = await newDummyERC20.getAddress()
        await faucetBank.setTokenAddress(newDummyERC20Address)
        const currentERC20Address = await faucetBank.greatApe77Coin()
        expect(currentERC20Address).to.be.equal(newDummyERC20Address);
    })
  
})