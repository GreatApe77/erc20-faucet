import { Avatar, Typography } from "@mui/material"
import { LoggedUser } from "../types/User"
import { formatAddress } from "../utils/formatAddress"
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type UserInfoProps = LoggedUser &{
	tokenBalance?:string;
}
export default function UserInfo(props: UserInfoProps) {
    const [copying, setCopying] = useState<boolean>(false);
    function handleCopyClick(){
        setCopying(true);
        navigator.clipboard.writeText(props.custodyAccountPublicKey as string)
        setTimeout(()=>{
            setCopying(false);
        }, 1500)
    }
  return (
    <>
			{props.custodyAccountPublicKey ? (
				<>
					<Typography component="h1" variant="h5">
						Hello! {props.nickname}
					</Typography>
					
					<Typography component="h1">GreatApe77 Coin Balance</Typography>
					<Typography component="p" variant="h4" sx={{ display: "flex" }}>
						{props.tokenBalance} <Avatar src="/great-ape-psn.png" />
					</Typography>
					<Typography color="text.secondary" sx={{ flex: 1 }}>
						{formatAddress(props.custodyAccountPublicKey as string)}
                        
                        
                        <span  onClick={handleCopyClick} >

                        <ContentCopyIcon  fontSize="inherit" color={copying?"primary":"inherit"} sx={{cursor:"pointer"}}  />
                        </span>
                        
					</Typography>
					
				</>
			) : (
				<>
					<Typography component="h1" variant="h5">
						Login to Faucet Account
					</Typography>
				</>
			)}
		</>
  )
}

