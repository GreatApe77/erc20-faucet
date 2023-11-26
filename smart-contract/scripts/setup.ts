import { ethers } from "hardhat";
import { saveDeployment} from "deployment-history"


async function main(){
    const network = await ethers.provider.getNetwork();
    const signers = await ethers.getSigners();
    const FaucetBankFactory = await ethers.getContractFactory("FaucetBank");
    const GreatApe77CoinFactory = await ethers.getContractFactory("GreatApe77Coin");
    const greatApe77Coin = await GreatApe77CoinFactory.deploy(signers[0].address);
    const faucetBank = await FaucetBankFactory.deploy(await greatApe77Coin.getAddress());
    await greatApe77Coin.transfer(await faucetBank.getAddress(),ethers.parseEther("777"))
    const address = await faucetBank.getAddress()
    console.log(address)
    saveDeployment(`GreatApe77Coin: ${await greatApe77Coin.getAddress()}`,network.name)
    saveDeployment(`FaucetBank: ${address}`,network.name)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});