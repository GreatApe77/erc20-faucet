import { SERVER_URL } from "../constants/server-url";
import { ApiResponse } from "../types/ApiResponse";
import { LoggingUser } from "../types/User";

export async function register({ nickname, password }: LoggingUser) {
    if(!nickname || !password) throw new Error("Invalid nickname or password")
    try {
        const response = await fetch(`${SERVER_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname, password }),
        });
        const data = await response.json()
        return {
            status:response.status,
            data:data,
        } as ApiResponse
    } catch (error) {
        console.error(error);
        throw new Error("Could not communicate with server");
    }
}
