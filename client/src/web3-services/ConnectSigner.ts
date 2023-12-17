import { ethers } from "ethers";

export async function getCurrentAccountInfo() {
	if (!window.ethereum) {
		throw new Error("No Metamask extension detected");
	}

	try {
		//const accounts = await window.ethereum.request({ method: "eth_accounts" });
		//return accounts[0]
		const provider = new ethers.BrowserProvider(window.ethereum);
		const [accounts, balance, network] = await Promise.all([
			window.ethereum.request({ method: "eth_accounts" }),
			provider.getBalance(window.ethereum.selectedAddress),
			provider.getNetwork(),
		]);
        return {
            address: accounts[0],
            balance: ethers.formatEther(balance),
            network: network.chainId,
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
