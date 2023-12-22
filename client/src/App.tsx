import { useContext, useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import { WalletContext } from "./context/WalletContext";
import { getCurrentAccountInfo } from "./web3-services/ConnectSigner";
import { Container, Grid, Paper } from "@mui/material";
import WalletInfo from "./components/WalletInfo";
import { WalletInfo as WalletInfoType } from "./types/WalletInfo";


function App() {
	const { setAccount } = useContext(WalletContext);
	const [walletInfo, setWalletInfo] = useState({
		ethBalance: "",
		erc20Balance: "",
		account: "",
	} as WalletInfoType)
	useEffect(() => {
		if(window.ethereum){
			if(window.ethereum._metamask.isUnlocked()){
				getCurrentAccountInfo()
				.then((accountInformation) => {
					console.log(accountInformation)
					setAccount(accountInformation.address);
					setWalletInfo({
						ethBalance: accountInformation.balance,
						erc20Balance: accountInformation.greatApe77CoinBalance,
						account: accountInformation.address
					})
					
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
			if(window.ethereum._metamask.isUnlocked()){
				getCurrentAccountInfo()
				.then((accountInformation) => {
					console.log(accountInformation)
					
					setWalletInfo({
						ethBalance: accountInformation.balance,
						erc20Balance: accountInformation.greatApe77CoinBalance,
						account: accountInformation.address
					})
					
				})
				.catch((err) => {
					console.error(err);
				});
			}
		});
	}
	return (
		<>
			<TopBar />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
               
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <WalletInfo account={walletInfo.account}
								ethBalance={walletInfo.ethBalance}
								erc20Balance={walletInfo.erc20Balance}
				/>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                 
                </Paper>
              </Grid>
            </Grid>
           
          </Container>
		</>
	);
}

export default App;
