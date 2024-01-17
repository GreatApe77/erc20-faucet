import { Button, CircularProgress, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { permit } from "../services/permit";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";



export default function TransferToConnectedWalletForm(){
    const [permitLoading,setPermitLoading] = useState(false)
    const [transferLoading,setTransferLoading] = useState(false)
    const {account} = useContext(WalletContext)
    const [amount,setAmount] = useState(0)
    function handlePermitCall(){
        if (isNaN(amount)) return
        const token = localStorage.getItem("token")
        
        if(!token) return 
        setPermitLoading(true)
        permit(ethers.parseEther(amount.toString()).toString(),token)
        .then((response)=>{
            console.log(response)
            if(response.status===200){
                alert("You approved the transfer to your Metamask wallet. Click the transfer button with the same amount to transfer to your connected wallet")
            }
        })
        .catch((error)=>{
            console.error(error)
        })
        .finally(()=>{
            setPermitLoading(false)
        })
    }
    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h4">
                    Transfer to your Metamask Wallet
                </Typography>
                <Stack>
                    <TextField
                    type="number"
                    required
                    label="amount"
                    onChange={(e)=>setAmount(parseFloat(e.target.value))}
                    inputProps={
                        {min:0,step:"0.01"}
                    }/>
                    <Button disabled={permitLoading} onClick={handlePermitCall}>
                        {permitLoading?<CircularProgress/>:"Permit"}

                    </Button>
                    {
                        account? 
                    <Button variant="contained">Transfer</Button>
                    : <></>
                    }
                </Stack>

            </Container>
        
        </>
    )
}