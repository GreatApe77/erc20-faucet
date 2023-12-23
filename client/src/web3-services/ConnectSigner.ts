import { ethers } from "ethers";
import { checkERC20Balance } from "./checkERC20Balance";
import { formatBalance } from "../utils/formatBalance";

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
		const balanceString = formatBalance(balance);
		
		
		const greatApe77CoinBalanceString = formatBalance(greatApe77CoinBalance);
        return {
            address: accounts[0],
            balance: balanceString,
            network: network.chainId,
			greatApe77CoinBalance: greatApe77CoinBalanceString
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
