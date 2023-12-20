import { ethers } from "hardhat";
import { saveDeployment} from "deployment-history"


async function main(){
    const network = await ethers.provider.getNetwork();
    const signers = await ethers.getSigners();
    const FaucetBankFactory = await ethers.getContractFactory("FaucetBank");
    const GreatApe77CoinFactory = await ethers.getContractFactory("GreatApe77Coin");
    console.log(`Deploying ERC20...`)
    const greatApe77Coin = await GreatApe77CoinFactory.deploy(signers[0].address);
    await greatApe77Coin.waitForDeployment()
    console.log(`Deploying FaucetBank...`)
    const faucetBank = await FaucetBankFactory.deploy(await greatApe77Coin.getAddress());
    await faucetBank.waitForDeployment()
    console.log(`Transfering tokens to FaucetBank...`)
    const response = await greatApe77Coin.transfer(await faucetBank.getAddress(),ethers.parseEther("777"))
    await response.wait()
    const address = await faucetBank.getAddress()
   
    //saveDeployment(`GreatApe77Coin: ${await greatApe77Coin.getAddress()}`,network.name)
    //saveDeployment(`FaucetBank: ${address}`,network.name)
    saveDeployment(address, 'FaucetBank', network.name)
    saveDeployment(await greatApe77Coin.getAddress(), 'GreatApe77Coin', network.name)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});