import { ethers } from "hardhat";
import { saveDeployment} from "deployment-history"
async function main() {
  const network = await ethers.provider.getNetwork();
  const ERC20Factory = await ethers.getContractFactory("GreatApe77Coin");
  const erc20 = await ERC20Factory.deploy();
  const address = await erc20.getAddress()
  console.log(address)
  saveDeployment(`GreatApe77Coin: ${address}`,network.name)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
