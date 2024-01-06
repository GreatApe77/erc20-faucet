import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { WalletProvider } from "./context/WalletContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import theme from "./theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CssBaseline>
			<ThemeProvider theme={theme}>
				<UserProvider>
					<WalletProvider>
						<App />
					</WalletProvider>
				</UserProvider>
			</ThemeProvider>
		</CssBaseline>
	</React.StrictMode>
);
