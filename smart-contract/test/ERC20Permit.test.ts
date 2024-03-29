import {
	loadFixture,time
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";
const types = {
    Permit: [{
        name: "owner",
        type: "address"
    },
    {
        name: "spender",
        type: "address"
    },
    {
        name: "value",
        type: "uint256"
    },
    {
        name: "nonce",
        type: "uint256"
    },
    {
        name: "deadline",
        type: "uint256"
    },
    ],
};
function getTimeStamp() {
    return Math.floor(Date.now() / 1000)
}

describe("ERC20Permit", () => {
    async function deployFixture() {
        const accounts = await ethers.getSigners();
        const ERC20PermitFactory = await ethers.getContractFactory("DummyERC20Permit");
        const erc20 = await ERC20PermitFactory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"),accounts[0].address);
        return { erc20, accounts };
    }
    it("should permit", async () => {
        const {erc20,accounts} = await loadFixture(deployFixture);
        const roles = {
            ownerOfTokens: accounts[0],
            spenderOfTokens: accounts[1],
            randomPerson: accounts[2],
        }
        const deadline = getTimeStamp() + 1000;
        const nonce = await erc20.nonces(roles.ownerOfTokens);
        const amount = ethers.parseEther("100");
        const chainId = (await ethers.provider.getNetwork()).chainId
        const domain = {
            name: await erc20.name(),
            version: "1",
            chainId: chainId,
            verifyingContract: await erc20.getAddress()

        }
        const values = {
            owner: roles.ownerOfTokens.address,
            spender: roles.spenderOfTokens.address,
            value: amount,
            nonce: nonce,
            deadline: deadline
        }

        const signature = await roles.ownerOfTokens.signTypedData(domain,types,values)
        const sigComponents = ethers.Signature.from(signature)
        const spenderInstance = erc20.connect(roles.spenderOfTokens)
        await spenderInstance.permit(
            roles.ownerOfTokens.address,
            roles.spenderOfTokens.address,
            amount,
            deadline,
            sigComponents.v,
            sigComponents.r,
            sigComponents.s
            )
        const allowance = await erc20.allowance(roles.ownerOfTokens.address,roles.spenderOfTokens.address)
        expect(allowance).to.equal(amount)
    })
    it("should not permit (deadline expired)",async()=>{
        const {erc20,accounts} = await loadFixture(deployFixture);
        const roles = {
            ownerOfTokens: accounts[0],
            spenderOfTokens: accounts[1],
            randomPerson: accounts[2],
        }
        const deadline = getTimeStamp() + 1000;
        const nonce = await erc20.nonces(roles.ownerOfTokens);
        const amount = ethers.parseEther("100");
        const chainId = (await ethers.provider.getNetwork()).chainId
        const domain = {
            name: await erc20.name(),
            version: "1",
            chainId: chainId,
            verifyingContract: await erc20.getAddress()

        }
        const values = {
            owner: roles.ownerOfTokens.address,
            spender: roles.spenderOfTokens.address,
            value: amount,
            nonce: nonce,
            deadline: deadline
        }

        const signature = await roles.ownerOfTokens.signTypedData(domain,types,values)
        const sigComponents = ethers.Signature.from(signature)
        const spenderInstance = erc20.connect(roles.spenderOfTokens)
        await time.increase(10000)
        await expect( spenderInstance.permit(
            roles.ownerOfTokens.address,
            roles.spenderOfTokens.address,
            amount,
            deadline,
            sigComponents.v,
            sigComponents.r,
            sigComponents.s
            )).to.be.revertedWithCustomError(erc20,"ERC2612ExpiredSignature")
    })
    it("should not permit (wrong deadline passed)",async()=>{
        const {erc20,accounts} = await loadFixture(deployFixture);
        const roles = {
            ownerOfTokens: accounts[0],
            spenderOfTokens: accounts[1],
            randomPerson: accounts[2],
        }
        const deadline = getTimeStamp() + 1000;
        const nonce = await erc20.nonces(roles.ownerOfTokens);
        const amount = ethers.parseEther("100");
        const chainId = (await ethers.provider.getNetwork()).chainId
        const domain = {
            name: await erc20.name(),
            version: "1",
            chainId: chainId,
            verifyingContract: await erc20.getAddress()

        }
        const values = {
            owner: roles.ownerOfTokens.address,
            spender: roles.spenderOfTokens.address,
            value: amount,
            nonce: nonce,
            deadline: deadline
        }

        const signature = await roles.ownerOfTokens.signTypedData(domain,types,values)
        const sigComponents = ethers.Signature.from(signature)
        const spenderInstance = erc20.connect(roles.spenderOfTokens)
        const wrongDeadlineToPass = getTimeStamp() +999
        await expect( spenderInstance.permit(
            roles.ownerOfTokens.address,
            roles.spenderOfTokens.address,
            amount,
            wrongDeadlineToPass,
            sigComponents.v,
            sigComponents.r,
            sigComponents.s
            )).to.be.revertedWithCustomError(erc20,"ERC2612InvalidSigner")
    })
    it("should return the correct Domain Separator",async()=>{
        const {erc20,accounts} = await loadFixture(deployFixture);
        const expectedDomainSeparator = "0xfd462f3fcea860cf278d9174be174faf02742483c29da3815b12195bf812e825"
        const DOMAIN_SEPARATOR = await erc20.DOMAIN_SEPARATOR()
        expect(DOMAIN_SEPARATOR).to.be.equal(expectedDomainSeparator)
    })
})