

import axios, { AxiosError } from 'axios'


import {HttpRequestPayloadZodSchema,  type HttpRequestPayload} from "@repo/types/types"
export async function api(apiPayload:HttpRequestPayload ):Promise<{data:any,axiosError:any}> {
    let data:any;
    let axiosError:any;

    try {

        const payload = HttpRequestPayloadZodSchema.safeParse(apiPayload);

        if(payload.success){
            const response = await axios(payload.data)
            data=response.data.data
        }
        if(payload.error){
            console.log(payload.error)
        }


    } catch (error) {
        if(error instanceof AxiosError){
           if(error.response?.data){
           axiosError=error.response.data.message
           }else{
            console.log(error.message)
           }

        }

        console.log(error,'from zod')
    }

    return {data,axiosError}

}