import { useContext, useEffect } from "react";
import TopBar from "./components/TopBar";
import { WalletContext } from "./context/WalletContext";
import { getCurrentAccountInfo } from "./web3-services/ConnectSigner";

function App() {
	const { setAccount } = useContext(WalletContext);
	useEffect(() => {
		if(window.ethereum){
			if(window.ethereum._metamask.isUnlocked()){
				getCurrentAccountInfo()
				.then((accountInformation) => {
					console.log(accountInformation)
					setAccount(accountInformation.address);
					
				})
				.catch((err) => {
					console.error(err);
				});
			}
		}
		
	},[])
	if (window.ethereum) {
		window.ethereum.on("accountsChanged", (accounts: any) => {
			setAccount(accounts[0]);
			localStorage.setItem("account", accounts[0]);
		});
	}
	return (
		<>
			<TopBar />
		</>
	);
}

export default App;
