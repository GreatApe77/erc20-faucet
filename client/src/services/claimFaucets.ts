import { SERVER_URL } from "../constants/server-url";
import { ApiResponse } from "../types/ApiResponse";

export async function claimFaucets(
	address: string,
	useConnectedWallet: boolean,
    token:string
) {
	const response = await fetch(
		`${SERVER_URL}/faucets${useConnectedWallet ? "?address=" + address : ""}`,
		{
            method: "POST",
            headers:{
                authorization: `Bearer ${token}`
            }
        }
	);
    const data = await response.json();
    return {
        status: response.status,
        data: data
    } as ApiResponse
}
