import { SERVER_URL } from "../constants/server-url"
import { ApiResponse } from "../types/ApiResponse"

export async function transferToMetamask(token:string,wallet:string){
    try {
        const response = await fetch(`${SERVER_URL}/metamask/${wallet}`,{
            method:"POST",
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        const data = await response.json()
        return {
            status:response.status,
            data:data
            
        }as ApiResponse
    } catch (error) {
        throw new Error("Could not reach the server")
    }
}