import { FormEvent, useContext, useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import { WalletContext } from "./context/WalletContext";
import { getCurrentAccountInfo } from "./web3-services/ConnectSigner";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import WalletInfo from "./components/WalletInfo";
import { WalletInfo as WalletInfoType } from "./types/WalletInfo";
import { fetchLoggedUserData } from "./services/fetchLoggedUserData";
import { LoggedUser } from "./types/User";
import { UserContext } from "./context/UserContext";
import { checkERC20Balance } from "./web3-services/checkERC20Balance";
import UserInfo from "./components/UserInfo";

import { claimFaucets } from "./services/claimFaucets";

function App() {
	const { setAccount, account } = useContext(WalletContext);
	const { user, setUser } = useContext(UserContext);
	const [useConnectedWallet, setUseConnectedWallet] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [severity, setSeverity] = useState<
		"success" | "error" | "info" | "warning" | undefined
	>();
	const [responseMessage, setResponseMessage] = useState<string>("");
	const [walletInfo, setWalletInfo] = useState({
		ethBalance: "",
		erc20Balance: "",
		account: "",
	} as WalletInfoType);
	function loadAccountInformation() {
		if (window.ethereum._metamask.isUnlocked()) {
			getCurrentAccountInfo()
				.then((accountInformation) => {
					console.log(accountInformation);
					setAccount(accountInformation.address);
					setWalletInfo({
						ethBalance: accountInformation.balance,
						erc20Balance: accountInformation.greatApe77CoinBalance,
						account: accountInformation.address,
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}
	function loadUserInformation() {
		const token = localStorage.getItem("token");
		if (!token) return;
		fetchLoggedUserData(token)
			.then((res) => {
				if(res.status !== 200) return;
				console.log(res);
				const user = res.data.data as LoggedUser;
				setUser(user);
				checkERC20Balance(user.custodyAccountPublicKey as string)
					.then((balance) => {
						console.log(balance);
						setUser((prevState) => {
							return { ...prevState, tokenBalance: balance };
						});
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	const handleCheckClick = () => {
		setUseConnectedWallet((prevState) => !prevState);
	};
	useEffect(() => {
		loadUserInformation();
		if (window.ethereum) {
			loadAccountInformation();
		}
	}, []);
	if (window.ethereum) {
		window.ethereum.on("accountsChanged", (accounts: any) => {
			setAccount(accounts[0]);
			localStorage.setItem("account", accounts[0]);
			loadAccountInformation();
		});
	}
	function handleClaimFaucetsSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const walletToUse = useConnectedWallet
			? account
			: user.custodyAccountPublicKey;
		if (!walletToUse) return;
		const token = localStorage.getItem("token");
		if (!token) return;
		setLoading(true);
		claimFaucets(walletToUse, useConnectedWallet, token)
			.then((res) => {
				if (res.status === 200) {
					setSeverity("success");
					setResponseMessage(res.data.message);
					setOpenSnackbar(true);
					//loadUserInformation();
				} else {
					//alert(`Code: ${res.status} - ${res.data.message}`)
					setSeverity("error");
					setResponseMessage(res.data.message);
					setOpenSnackbar(true);
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}
	const handleSnackBarClose = (
		_event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};
	return (
		<>
			<TopBar />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								height: 240,
							}}
						>
							
							<UserInfo
								nickname={user.nickname}
								custodyAccountPublicKey={user.custodyAccountPublicKey}
								tokenBalance={user.tokenBalance}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								height: 240,
							}}
						>
							<WalletInfo
								account={walletInfo.account}
								ethBalance={walletInfo.ethBalance}
								erc20Balance={walletInfo.erc20Balance}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
							<Container>
								<Box>
									<Typography variant="h4" marginBottom={"2rem"} component="h2">
										Claim Faucets
									</Typography>
								</Box>
								<form onSubmit={handleClaimFaucetsSubmit}>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: "1rem",
										}}
									>
										<TextField
											fullWidth
											id="fullWidth"
											disabled={user.custodyAccountPublicKey ? false : true}
											value={
												useConnectedWallet
													? account
													: user.custodyAccountPublicKey
											}
										></TextField>
										<FormControlLabel
											onChange={handleCheckClick}
											disabled={!Boolean(account)}
											control={<Checkbox />}
											label="Use your connected wallet?"
										/>

										<Button
											size="large"
											type="submit"
											variant="contained"
											fullWidth
											color="primary"
											disabled={loading || !user.custodyAccountPublicKey}
										>
											{loading ? (
												<CircularProgress color="inherit" />
											) : (
												"Claim Faucets"
											)}
										</Button>
									</Box>
								</form>
							</Container>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			<Snackbar
				anchorOrigin={{ horizontal: "center", vertical: "top" }}
				open={openSnackbar}
				autoHideDuration={8000}
				onClose={handleSnackBarClose}
			>
				<Alert
					variant="filled"
					onClose={handleSnackBarClose}
					severity={severity}
					sx={{ width: "100%" }}
				>
					<AlertTitle>{severity?.toUpperCase()}</AlertTitle>
					{responseMessage}
				</Alert>
			</Snackbar>
		</>
	);
}

export default App;
