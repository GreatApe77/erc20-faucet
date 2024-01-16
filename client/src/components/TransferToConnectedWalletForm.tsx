import { Button, Container, Stack, TextField, Typography } from "@mui/material";



export default function TransferToConnectedWalletForm(){

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
                    inputProps={
                        {min:0,step:"0.01"}
                    }/>
                    <Button>Permit Transfer</Button>
                    <Button variant="contained">Transfer</Button>
                </Stack>

            </Container>
        
        </>
    )
}