import { LoggingUser } from "../types/User";

export async function register({ nickname, password }: LoggingUser) {
    if(!nickname || !password) throw new Error("Invalid nickname or password")
    try {
        
    } catch (error) {
        console.error(error);
        throw new Error("Could not communicate with server");
    }
}
