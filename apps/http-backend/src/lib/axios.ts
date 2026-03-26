import { HttpRequestPayload } from "@repo/types/types";
import axios, { AxiosError } from 'axios'

export async function api(data: HttpRequestPayload) {

    try {
        const response = await axios(data)
        return response.data;

    } catch (error) {
        if(error instanceof AxiosError){
            return error.response?.data;
        }
    }
}