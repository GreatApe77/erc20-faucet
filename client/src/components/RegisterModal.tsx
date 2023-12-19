import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {  TextField } from "@mui/material";
import { useState } from "react";
import { LoggingUser } from "../types/User";
import { register } from "../services/register";

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

	const [user, setUser] = useState<LoggingUser>({ nickname: "", password: "" });
	const [message, setMessage] = useState<string>("");
	const handleClose = () => {
		setOpen(false)
		setMessage("")
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(user);
		if(user.nickname.length<3 || user.password.length<8){
			setMessage("Nickname precisa ter pelo menos 3 caracteres e senha 8");
			return;
		}
		register(user)
			.then((res) => {
				if(res.status===201){
					console.log(res);
					localStorage.setItem("token", res.data.token);
					handleClose();
				}
				else{
					setMessage(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
						Register for Faucet
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
								required
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
						<Button variant="contained" type="submit" >
							Register
						</Button>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							{message}
						</Typography>
					</form>
				</Box>
			</Modal>
		</>
	);
}
