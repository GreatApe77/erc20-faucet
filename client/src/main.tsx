import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { WalletProvider } from "./context/WalletContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CssBaseline>
			<UserProvider>
				<WalletProvider>
					<App />
				</WalletProvider>
			</UserProvider>
		</CssBaseline>
	</React.StrictMode>
);
