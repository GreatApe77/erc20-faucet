import { SERVER_URL } from "../constants/server-url"
import { ApiResponse } from "../types/ApiResponse"


export async function fetchLoggedUserData(token: string) {
   try {
        const response = await fetch(`${SERVER_URL}/users/me`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        return {
            status: response.status,
            data
        } as ApiResponse
   } catch (error:any) {
        console.error(error)
        throw new Error("Error cwhile trying to get user")
    }
    
}