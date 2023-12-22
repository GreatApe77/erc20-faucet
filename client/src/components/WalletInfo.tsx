import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

type Props = {
	account?: string;
	erc20Balance?: string;
	ethBalance?: string;
};

export default function WalletInfo(props: Props) {
	return (
		<>
			{props.account ? (
				<>
					<Typography component="h1" variant="h5">
						Native Token Balance
					</Typography>
					<Typography component="p" variant="h4" sx={{ display: "flex" }}>
						{props.ethBalance} <Avatar src="/ethereumicon.svg" />
					</Typography>
					<Typography component="h1">GreatApe77 Coin Balance</Typography>
					<Typography component="p" variant="h4" sx={{ display: "flex" }}>
						{props.erc20Balance} <Avatar src="/great-ape-psn.png" />
					</Typography>
					<Typography color="text.secondary" sx={{ flex: 1 }}>
						{props.account}
					</Typography>
					<div>
						<Avatar src="/MetaMask_Fox.svg" />
					</div>
				</>
			) : (
				<>
					<Typography component="h1" variant="h5">
						Connect your Metamask Wallet
					</Typography>
				</>
			)}
		</>
	);
}
