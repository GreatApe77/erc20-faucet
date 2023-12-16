import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
export default function TopBar() {
	return (
		<AppBar color="transparent" position="static">
			<Toolbar>
				{/* Left side - Logo and Name */}
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Avatar src="/great-ape-psn.png" />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					GreatApe77 Faucets
				</Typography>

				{/* Right side - Buttons */}
				<Button color="primary" variant="contained">
					Login
				</Button>
				<Button color="primary" variant="text">
					Register
				</Button>
				<Button color="info" variant="outlined">
					Connect Wallet
				</Button>
			</Toolbar>
		</AppBar>
	);
}
