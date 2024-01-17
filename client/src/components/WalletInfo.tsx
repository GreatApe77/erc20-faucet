import Typography from "@mui/material/Typography";
import { Avatar, Button, CircularProgress, Snackbar } from "@mui/material";
import { formatAddress } from "../utils/formatAddress";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import { importTokens } from "../web3-services/importTokens";
type Props = {
	account?: string;
	erc20Balance?: string;
	ethBalance?: string;
};

export default function WalletInfo(props: Props) {
    const [copying, setCopying] = useState<boolean>(false);
	const [importingLoading, setImportingLoading] = useState<boolean>(false);
	function handleImportClick() {
		setImportingLoading(true);
		importTokens()
		.finally(() => {
			setImportingLoading(false);
		})
	}
    function handleCopyClick(){
        setCopying(true);
        navigator.clipboard.writeText(props.account as string)
        setTimeout(()=>{
            setCopying(false);
        }, 1500)
    }
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
						{formatAddress(props.account)}
                        
                        
                        <span  onClick={handleCopyClick} >

                        <ContentCopyIcon  fontSize="inherit" color={copying?"primary":"inherit"} sx={{cursor:"pointer"}}  />
                        </span>
                        
					</Typography>
					<Button onClick={handleImportClick}>
						{importingLoading ? (
							<CircularProgress />
						) : (
							"Import Token")}
					</Button>

					<Snackbar
						open={copying}
						message={"Copied to clipboard"}
						anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
					></Snackbar>
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
