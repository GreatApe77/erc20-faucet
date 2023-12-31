import {
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20", () => {
    async function deployERC20Fixture() {
        const accounts = await ethers.getSigners();
        const ERC20Factory = await ethers.getContractFactory("DummyERC20");
        const erc20 = await ERC20Factory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"),accounts[0].address);
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
    it("should NOT transfer (insufficient balance)", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const recipient = accounts[1].address;
        const amount = ethers.parseEther("778");
        await expect(erc20.transfer(recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferInsufficientBalance")
    })
    it("should NOT transfer (address(0))", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const recipient = ethers.ZeroAddress;
        const amount = ethers.parseEther("777");
        await expect(erc20.transfer(recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferToZeroAddress")
    })
    it("should approve", async () => { 
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1].address;
        const amount = ethers.parseEther("777");
        await erc20.approve(spender,amount);
        const expectedAllowance = ethers.parseEther("777");
        const currentAllowance = await erc20.allowance(accounts[0].address,spender);
        expect(currentAllowance).to.be.equal(expectedAllowance);
    })
    it("should not approve if aprroved amount is greater than msg.sender balance", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1].address;
        const amount = ethers.parseEther("778");
        await expect(erc20.approve(spender,amount)).to.be.revertedWithCustomError(erc20,"ERC20__approveInsufficientBalance")
    })
    it("should not approve (address(0))", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = ethers.ZeroAddress
        const amount = ethers.parseEther("777");
        await expect(erc20.approve(spender,amount)).to.be.revertedWithCustomError(erc20,"ERC20__approveToZeroAddress")
    })
    it("should transferFrom", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1].address;
        const recipient = accounts[2].address;
        const amount = ethers.parseEther("777");
        await erc20.approve(spender,amount);
        await erc20.connect(accounts[1]).transferFrom(accounts[0].address,recipient,amount);
        const expectedBalance = ethers.parseEther("777");
        const currentBalance = await erc20.balanceOf(recipient);
        const remeterBalance = await erc20.balanceOf(accounts[0].address);
        expect(remeterBalance).to.be.equal(0);
        expect(currentBalance).to.be.equal(expectedBalance);
    })
    it("should NOT transferFrom (not approved)", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1]
        const recipient = accounts[2]
        const amount = ethers.parseEther("777");
        await expect(erc20.connect(spender).transferFrom(accounts[0].address,recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferFromInsufficientAllowance")
    })
    it("should NOT transferFrom (to address(0))", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1]
        const recipient = ethers.ZeroAddress
        await erc20.approve(spender.address,ethers.parseEther("777"))
        const amount = ethers.parseEther("777");
        await expect(erc20.connect(spender).transferFrom(accounts[0].address,recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferFromToAddressZero")
    })
    it("should not transferFrom (from address(0))", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1]
        const recipient = accounts[2]
        const amount = ethers.parseEther("777");
        await erc20.approve(spender.address,amount)
        await expect(erc20.connect(spender).transferFrom(ethers.ZeroAddress,recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferFromFromAddressZero")
    })
    it("should not transferFrom (value ==0)", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1]
        const recipient = accounts[2]
        const amount = ethers.parseEther("777");
        await erc20.approve(spender.address,amount)
        await expect(erc20.connect(spender).transferFrom(accounts[0].address,recipient,0)).to.be.revertedWithCustomError(erc20,"ERC20__transferFromWithValueZero")
    })
    it("should not transferFrom (insufficient balance)", async () => {
        const { erc20, accounts } = await loadFixture(deployERC20Fixture);
        const spender = accounts[1]
        const recipient = accounts[2]
        const amount = ethers.parseEther("778");
       // await erc20.approve(spender.address,amount)
        await expect(erc20.connect(spender).transferFrom(accounts[0].address,recipient,amount)).to.be.revertedWithCustomError(erc20,"ERC20__transferFromInsufficientBalance")
    })

})