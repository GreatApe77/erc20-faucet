import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { LoggingUser } from "../types/User";
import { login } from "../services/login";

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
	const handleClose = () => setOpen(false);
	const [user, setUser] = React.useState<LoggingUser>({
		nickname: "",
		password: "",
	});
	const [message, setMessage] = React.useState<string>("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(user);
		if(user.nickname.length<3 || user.password.length<8){
			setMessage("Nickname precisa ter pelo menos 3 caracteres e senha 8");
			return;
		}
		login(user)
			.then((res) => {
				if(res.status===200){
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
						<Button variant="contained" type="submit">
							Login
						</Button>
						<Typography
							id="modal-modal-description"
							sx={{ mt: 2 }}
						>
						{message?message:""}

						</Typography>
					</form>
				</Box>
			</Modal>
		</>
	);
}
