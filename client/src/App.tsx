import { useContext } from "react";
import TopBar from "./components/TopBar";
import { WalletContext } from "./context/WalletContext";
import { Typography } from "@mui/material";
function App() {
	if(window.ethereum){
		window.ethereum.on('accountsChanged' ,(accounts:any)=> {
			// Time to reload your interface with accounts[0]!
			console.log(accounts[0]);
		})
	}
	const { account,connectWallet} = useContext(WalletContext);
	return (
		<  >
			<TopBar/>
			
			<Typography variant="h1">{account}</Typography>
		</>
	);
}

export default App;
