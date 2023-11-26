import {
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

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
    it("should check initial claim amount 7 * 10 **18 (7 ether)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const claimAmount = await faucetBank.claimAmount()
        expect(claimAmount).to.be.equal(ethers.parseEther("7"));
    })
    it("should check initial claim amount 2 minutes", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const claimInterval = await faucetBank.claimInterval()
        const TWO_MINUTES = 120
        expect(claimInterval).to.be.equal(TWO_MINUTES);
    })
    it("should set claim amount", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const claimAmount = ethers.parseEther("77")
        await faucetBank.setClaimAmount(claimAmount)
        const currentClaimAmount = await faucetBank.claimAmount()
        expect(currentClaimAmount).to.be.equal(claimAmount);
    })
    it("should not set claim amount (not owner)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const claimAmount = ethers.parseEther("77")
        await expect(faucetBank.connect(accounts[1]).setClaimAmount(claimAmount)).to.be.revertedWithCustomError(faucetBank,"Ownable__notOwner")
    })
    it("should set claim interval", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const THREE_MINUTES = 180
        const claimInterval = THREE_MINUTES
        await faucetBank.setClaimIntervalInSeconds(claimInterval)
        const currentClaimInterval = await faucetBank.claimInterval()
        expect(currentClaimInterval).to.be.equal(claimInterval);
    })
    it("should not set claim interval (not owner)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const THREE_MINUTES = 180
        const claimInterval = THREE_MINUTES
        await expect(faucetBank.connect(accounts[1]).setClaimIntervalInSeconds(claimInterval)).to.be.revertedWithCustomError(faucetBank,"Ownable__notOwner")
    })
    it("should not set token address (not owner)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const DummyERC20Factory = await ethers.getContractFactory("DummyERC20")
        const newDummyERC20 = await DummyERC20Factory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"),accounts[0].address);
        const newDummyERC20Address = await newDummyERC20.getAddress()
        await expect(faucetBank.connect(accounts[1]).setTokenAddress(newDummyERC20Address)).to.be.revertedWithCustomError(faucetBank,"Ownable__notOwner")
    })
    it("should claim Faucets", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        const claimAmount = await faucetBank.claimAmount()
        await faucetBank.claimFaucets(accounts[1].address)
        const balance = await erc20.balanceOf(accounts[1].address)
        expect(balance).to.be.equal(claimAmount);
    })
    it("should not claim Faucets (not owner)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        await expect(faucetBank.connect(accounts[1]).claimFaucets(accounts[1].address)).to.be.revertedWithCustomError(faucetBank,"Ownable__notOwner")
    })
    it("should not claim Faucets (not reached nextClaim timestamp)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        await faucetBank.claimFaucets(accounts[1].address)
        await expect(faucetBank.claimFaucets(accounts[1].address)).to.be.revertedWithCustomError(faucetBank,"FaucetBank__ClaimIntervalNotReached")
    })
    it("should claim faucets after nextClaim timestamp", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        await faucetBank.claimFaucets(accounts[1].address)
        await time.increase(120)
        await faucetBank.claimFaucets(accounts[1].address)
        const balance = await erc20.balanceOf(accounts[1].address)
        //const claimAmount = await faucetBank.claimAmount()
        expect(balance).to.be.equal(ethers.parseEther("14"));  
    })
    it("should withdraw Faucets as owner", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        await faucetBank.withdrawAmount(ethers.parseEther("77"))
        const balance = await erc20.balanceOf(accounts[0].address)
        expect(balance).to.be.equal(ethers.parseEther("77"));
        
    })
    it("should not withdraw Faucets (not owner)", async () => {
        const { faucetBank, accounts,erc20 } = await loadFixture(deployFaucetBankFixture);
        const faucetAddress = await faucetBank.getAddress()
        await erc20.transfer(faucetAddress,ethers.parseEther("777"))
        await expect(faucetBank.connect(accounts[1]).withdrawAmount(ethers.parseEther("77"))).to.be.revertedWithCustomError(faucetBank,"Ownable__notOwner")
    })
    
})