import type { HttpRequestPayload } from "@repo/types/types";
import axios from "axios";

export async function httpNode(apiData:HttpRequestPayload):Promise<any>{
    try {
        const response =  await axios(apiData)
        return response.data
    } catch (error) {
        throw error
    }
}

