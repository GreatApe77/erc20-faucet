import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const ERC20Factory = await ethers.getContractFactory("DummyERC20");
  const erc20 = await ERC20Factory.deploy("Dummy ERC20", "DERC20",ethers.parseEther("777"));
  const address = await erc20.getAddress()
  console.log(address)  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
