import { ethers } from "ethers";
import { checkERC20Balance } from "./checkERC20Balance";

export async function getCurrentAccountInfo() {
	if (!window.ethereum) {
		throw new Error("No Metamask extension detected");
	}

	try {
		//const accounts = await window.ethereum.request({ method: "eth_accounts" });
		//return accounts[0]
		const provider = new ethers.BrowserProvider(window.ethereum);
		const [accounts, balance, network,greatApe77CoinBalance] = await Promise.all([
			window.ethereum.request({ method: "eth_accounts" }),
			provider.getBalance(window.ethereum.selectedAddress),
			provider.getNetwork(),
			checkERC20Balance(window.ethereum.selectedAddress)
		]);
        return {
            address: accounts[0],
            balance: ethers.formatEther(balance),
            network: network.chainId,
			greatApe77CoinBalance: ethers.formatEther(greatApe77CoinBalance)
        }
	} catch (error) {
		console.error(error);
		throw new Error("must conect to metamask first");
	}
}

export async function connectSigner() {
	if (!window.ethereum) {
		throw new Error("No Metamask extension detected");
	}
	const provider = new ethers.BrowserProvider(window.ethereum);
	try {
		const signer = await provider.getSigner();

		return signer;
	} catch (error) {
		console.error(error);
		throw new Error("Error connecting to Metamask");
	}
}
