import { ethers } from "ethers";

export async function getCurrentAccountInfo() {
	if (!window.ethereum) {
		throw new Error("No Metamask extension detected");
	}

	try {
		const account = await window.ethereum.request({ method: "eth_accounts" });
		return account[0];
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
