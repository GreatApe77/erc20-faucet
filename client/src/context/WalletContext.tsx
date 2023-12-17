import { createContext, useState, Dispatch, SetStateAction } from "react";
import { connectSigner } from "../web3-services/ConnectSigner";


export const WalletContext = createContext({
	account: "",
	connectWallet: async () => {},
	setAccount: () => {},
});
type Props = {
	children: React.ReactNode;
};
export const WalletProvider = ({ children }: Props) => {
	const [account, setAccount] = useState<string>("");

	const connectWallet = async () => {
		try {
			const signer = await connectSigner();
			const address = await signer.getAddress();
			setAccount(address);
		} catch (error) {
			console.error("Error connecting wallet:", error);
		}
	};
	const contextValue = {
		account,
		connectWallet,
		setAccount,
	};
	return (
		<WalletContext.Provider value={contextValue}>
			{children}
		</WalletContext.Provider>
	);
};
