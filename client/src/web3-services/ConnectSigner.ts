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
		const mainBalance = ethers.formatUnits(balance, 18).split(".")[0];
		const decimalBalance = ethers.formatUnits(balance, 18).split(".")[1];
		const balanceString = `${mainBalance}.${decimalBalance.slice(0, 2)}`;
		
		const greatApe77CoinMainBalanceString = ethers.formatUnits(greatApe77CoinBalance, 18).split(".")[0];
		const greatApe77CoinDecimalBalance = ethers.formatUnits(greatApe77CoinBalance, 18).split(".")[1];
		const greatApe77CoinBalanceString = `${greatApe77CoinMainBalanceString}.${greatApe77CoinDecimalBalance.slice(0, 2)}`;
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
