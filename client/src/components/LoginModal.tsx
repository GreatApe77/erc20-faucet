import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {  Alert, AlertTitle, CircularProgress, Snackbar, TextField } from "@mui/material";
import { LoggingUser } from "../types/User";
import { login } from "../services/login";
import { useState } from "react";

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
export default function LoginModal({ open, setOpen }: Props) {
	const [user, setUser] = React.useState<LoggingUser>({
		nickname: "",
		password: "",
	});
	const [message, setMessage] = React.useState<string>("");
	const [responseMessage, setResponseMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
	const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning" | undefined>("success");

	const handleClose = () => {
		setOpen(false);
		setMessage("");
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (user.nickname.length < 3 || user.password.length < 8) {
			setMessage("Nickname precisa ter pelo menos 3 caracteres e senha 8");
			return;
		}
		console.log(user);
		setLoading(true);
		login(user)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					localStorage.setItem("token", res.data.token);
					setResponseMessage(res.data.message as string);
					setSeverity("success");
					setOpenSnackbar(true);
					handleClose();
				} else {
					setMessage(res.data.message);
					setSeverity("error");
					setOpenSnackbar(true);
					setResponseMessage(res.data.message as string);
				}
			})
			.catch((err) => {
				console.log(err);
			}).finally(()=>{
				setLoading(false);
			})
	};
	const handleSnackBarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenSnackbar(false);
	  };
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setUser((prevUser) => ({ ...prevUser, [name]: value } as LoggingUser));
	};

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
						Login to Faucet Account
					</Typography>
					<form onSubmit={handleSubmit}>
						<Box>
							<TextField
								name="nickname"
								onChange={handleChange}
								id="standard-basic"
								label="Nickname"
								variant="standard"
								sx={{ width: "100%", marginBottom: "1rem" }}
							/>
							<TextField
								name="password"
								onChange={handleChange}
								id="standard-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="standard"
								sx={{ width: "100%", marginBottom: "1rem" }}
								required
							/>
						</Box>
						<Button disabled={loading} variant="contained" type="submit">
						{loading ? (
								<CircularProgress color="inherit" size={20} />
							) : (
								"Login"
							)}
						</Button>
						<Typography color="red" id="modal-modal-description" sx={{ mt: 2 }}>
							{message ? message : ""}
						</Typography>
					</form>
				</Box>
				
			</Modal>

			<Snackbar anchorOrigin={{horizontal:"center",vertical:"top"}} open={openSnackbar} autoHideDuration={16000} onClose={handleSnackBarClose}>
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
