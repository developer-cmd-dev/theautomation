import type { HttpRequestPayload } from "@repo/types/types";
import { AxiosError } from "axios";
import axios from "axios";
import { useState,useEffect } from "react";




export default function useApi(apiPayload:HttpRequestPayload){

    const [data,setData]=useState<any>();
    const [error,setError]=useState<any>();
    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios(apiPayload);
                setData(response.data.data)
            } catch (error) {
                if(error instanceof AxiosError){
                    if(error.response?.data){
                        setError(error.response.data.message)
                    }
                }
            }


        })()
    },[])


    return{data,error}


}