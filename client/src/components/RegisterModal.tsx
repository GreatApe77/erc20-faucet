import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;

};
export default function RegisterModal({ open, setOpen }: Props) {
	const handleClose = () => setOpen(false);

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h4" component="h2">
						Register for Faucet
					</Typography>
					<FormControl>
						<Box >
							<TextField
								id="standard-basic"
								label="Nickname"
								variant="standard"
                                sx={{width: "100%", marginBottom: "1rem"}}
							/>
							<TextField
								id="standard-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="standard"
                                sx={{width: "100%",marginBottom: "1rem"}}
							/>
						</Box>
						<Button variant="contained" onClick={handleClose}>
							Register
						</Button>
					</FormControl>
				</Box>
			</Modal>
		</>
	);
}
