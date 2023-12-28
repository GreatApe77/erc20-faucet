import { GREAT_APE_77_COIN_ADDRESS } from "../constants/erc-address";

export async function importTokens() {
	const tokenAddress = GREAT_APE_77_COIN_ADDRESS;
	const tokenSymbol = "GRTPC";
	const tokenDecimals = 18;
	const tokenImage = "/great-ape-psn.png";
    try {
        const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: tokenAddress, // The address of the token.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
                    decimals: tokenDecimals, // The number of decimals in the token.
                    image: tokenImage, // A string URL of the token logo.
                },
            },
        });
        if (wasAdded) {
            console.log("Token Added");
        } else {
            console.log("User opted out of token addition");
        }    
    } catch (error) {
        console.error(error);
    }
	

}
