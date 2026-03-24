

import axios, { AxiosError } from 'axios'


import {type ApiProps} from "@repo/types/types"
export async function api(apiPayload:ApiProps ):Promise<any|AxiosError> {

    try {

        const response = await axios(apiPayload)
        return response.data


    } catch (error) {
        if(error instanceof AxiosError){
           if(error.response?.data){
            console.log(error.response.data)
           }else{
            console.log(error.message)
           }

           return error
        }
    }

}