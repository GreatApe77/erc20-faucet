import { SERVER_URL } from "../constants/server-url"
import { ApiResponse } from "../types/ApiResponse"

export async function permit(amount:string,token:string){
    try {
        console.log({amount})
        const response = await fetch(`${SERVER_URL}/permit`,
            {
                method: "POST",
                headers:{
                    authorization: `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({amount})
            }
        )
        const data = await response.json()
        return {
            status:response.status,
            data:data
        } as ApiResponse
    } catch (error) {
        console.error(error)
        throw new Error("Could not reach the server")
    }
}