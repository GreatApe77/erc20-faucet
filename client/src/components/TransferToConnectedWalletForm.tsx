import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { permit } from "../services/permit";
import { ethers } from "ethers";



export default function TransferToConnectedWalletForm(){
    const [permitLoading,setPermitLoading] = useState(false)
    const [transferLoading,setTransferLoading] = useState(false)
    const [amount,setAmount] = useState(0)
    function handlePermitCall(){
        if (isNaN(amount)) return
        const token = localStorage.getItem("token")
        if(!token) return 
        permit(ethers.parseEther(amount.toString()).toString(),token)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.error(error)
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
                    <Button onClick={handlePermitCall}>Permit Transfer</Button>
                    <Button variant="contained">Transfer</Button>
                </Stack>

            </Container>
        
        </>
    )
}