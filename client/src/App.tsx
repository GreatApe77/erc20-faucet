import { useContext } from "react";
import TopBar from "./components/TopBar";
import { WalletContext } from "./context/WalletContext";
import { Typography } from "@mui/material";
function App() {
	const { account,connectWallet,setAccount} = useContext(WalletContext);
	if(window.ethereum){
		window.ethereum.on('accountsChanged' ,(accounts:any)=> {
			setAccount(accounts[0])
		})
	}
	return (
		<  >
			<TopBar/>
			
			<Typography variant="h1">{account}</Typography>
		</>
	);
}

export default App;
