import { useContext, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	useMediaQuery,
	Avatar,
	Drawer,
	List,
	ListItemText,
	Box,
	ListItemButton,
	CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { WalletContext } from "../context/WalletContext";
import { formatAddress } from "../utils/formatAddress";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function TopBar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [connectingWallet, setConnectingWallet] = useState(false);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const [registerModalOpen, setRegisterModalOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width:850px)");
	const { connectWallet, account } = useContext(WalletContext);
	const handleLoginModalOpen = () => setLoginModalOpen(true);
	const handelRegisterModalOpen = () => setRegisterModalOpen(true);
	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};
	function handleMobileConnectWallet() {
		setConnectingWallet(true);
		connectWallet().finally(() => {
			setConnectingWallet(false);
		});
	}
	function handleConnectWallet() {
		setConnectingWallet(true);
		connectWallet().finally(() => {
			setConnectingWallet(false);
		});
	}

	async function logout() {
		localStorage.removeItem("token");
		//window.location.reload();
		if (window.ethereum) {
			try {
				await window.ethereum.request({
					method: "wallet_revokePermissions",
					params: [{ eth_accounts: {} }],
				});
			} catch (error) {
				window.location.reload();
			}
		}
		window.location.reload();
	}
	return (
		<AppBar sx={{bgcolor:"black"}} position="static">
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Left side - Logo and Name */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Avatar src="/great-ape-psn.png" />
					</IconButton>
					<Typography variant="h6" component="div">
						GreatApe77 Faucets
					</Typography>
				</Box>

				{isMobile ? (
					<IconButton
						edge="end"
						color="inherit"
						aria-label="menu"
						onClick={handleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>
				) : (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Button
							onClick={handleLoginModalOpen}
							color="primary"
							variant="contained"
						>
							Login
						</Button>
						<Button
							onClick={handelRegisterModalOpen}
							color="primary"
							variant="text"
						>
							Register
						</Button>
						<Button onClick={logout} color="error" variant="text">
							Logout
						</Button>
						<Button
							onClick={handleConnectWallet}
							color="info"
							variant="outlined"
						>
							<Avatar src="/MetaMask_Fox.svg" />
							{account ? (
								formatAddress(account)
							) : connectingWallet ? (
								<>
									Connecting...
									<CircularProgress size={20} />
								</>
							) : (
								"Connect Wallet"
							)}
						</Button>
					</Box>
				)}

				<Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
					<List>
						<ListItemButton
							onClick={() => {
								handleDrawerClose();
								handleLoginModalOpen();
							}}
						>
							<ListItemText primary="Login" />
						</ListItemButton>
						
						<ListItemButton
							onClick={logout}
						>
							<ListItemText primary="Logout" />
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								handleDrawerClose();
								handelRegisterModalOpen();
							}}
						>
							<ListItemText primary="Register" />
						</ListItemButton>
						<ListItemButton onClick={handleMobileConnectWallet}>
							<ListItemText
								secondary={
									account ? (
										<>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<Avatar src="/MetaMask_Fox.svg" />
												{formatAddress(account)}
											</Box>
										</>
									) : (
										""
									)
								}
								primary={
									account ? (
										"Connected as:"
									) : connectingWallet ? (
										<>
											Connecting...
											<CircularProgress size={20} />
										</>
									) : (
										"Connect Wallet"
									)
								}
							/>
						</ListItemButton>
					</List>
				</Drawer>
			</Toolbar>
			<LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
			<RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
		</AppBar>
	);
}
