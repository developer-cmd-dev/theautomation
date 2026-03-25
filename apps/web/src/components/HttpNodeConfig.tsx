import React, { useCallback, useEffect, useState } from 'react'
import ExecutionResult from './ExecutionResult'
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { NodeOptionDialog } from './NodeOptionDialog';
import type { HttpMethods } from '@repo/types/types';
import type { HttpFields } from '@/types/types';
import HttpNodeBodyEditor from './HttpNodeBodyEditor';
import { useDebounce } from 'use-debounce';

function HttpNodeConfig() {

    const [method, setMethod] = useState<string>('GET');
    const [url, setUrl] = useState<string>('')
    const [queries, setQueries] = useState<Record<string, string>>({})
    const [headers, setHeaders] = useState<Record<string, string>>({})
    const [body,setBody]=useState<object>({})
    const [apiDataPayload,setApiDataPayload]=useState<object>({})

    const httpFields = useCallback((data: HttpFields[]) => {
        data.forEach((element: HttpFields) => {
            if (element.type === 'query') {
                setQueries(prev => {
                    return {
                        ...prev,
                        [element.key]: element.value
                    }
                })
            } else if (element.type === 'headers') {
                setHeaders(prev => {
                    return {
                        ...prev,
                        [element.key]: element.value
                    }
                })
            }
        })
    },[])


    const httpBodyData = useCallback((data:string)=>{
        if(data){
            setBody(JSON.parse(data))
        }
    },[])

    const [urlData]=useDebounce(url,1000)


    useEffect(()=>{

        const apiData = {
            urlData,
            method,
            headers,
            queries,
            body
        }
        setApiDataPayload(apiData)
    },[queries,headers,body,urlData,method])

 



    return (
        <div className="w-full h-full flex items-center ">

            <ExecutionResult type="Input" />

            <div className='min-w-100 max-w-100  h-full border  rounded-md p-4 flex flex-col gap-5' >
                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">HTTP Methods</Label>
                    <Select onValueChange={(e: HttpMethods) => setMethod(e)} defaultValue={method}  >
                        <SelectTrigger className="w-full max-w-full">
                            <SelectValue placeholder="Select Methods" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    methods.map((element) => (
                                        <SelectItem key={element} value={element}>{element}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Url</Label>
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} type='text' placeholder='http://example.com' />
                </div>


                {
                    options.map((element) => {
                        return (
                            <div key={element.type} className="input-area  flex flex-col gap-3  ">
                                <Label className="text-gray-500 font-semibold">{element.title}</Label>
                                <NodeOptionDialog submitFields={httpFields} type={element.type}>
                                    <Button variant={"outline"}>
                                        Add
                                    </Button>
                                </NodeOptionDialog>
                            </div>
                        )
                    })
                }

                <div  className="input-area  flex flex-col gap-3  ">
                    <Label className="text-gray-500 font-semibold">Body</Label>
                    <HttpNodeBodyEditor saveBodyData={httpBodyData} >
                        <Button variant={"outline"}>
                            Add
                        </Button>
                    </HttpNodeBodyEditor>
                </div>

                <div className=' h-65 overflow-y-auto p-1 bg-gray-100 rounded-md'>
                   <pre>
                    {
                        JSON.stringify(apiDataPayload,null,4)
                    }
                   </pre>
                </div>




            </div>

            <ExecutionResult type="Output" />
        </div>
    )
}

export default HttpNodeConfig




const methods: string[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS',
    'CONNECT',
    'TRACE'
];


type OptionType = {
    type: "query" | "headers" | "body",
    title: string;
}


const options: OptionType[] = [
    {
        type: 'query',
        title: "Send Query",
    },
    {
        type: 'headers',
        title: "Send Headers"
    },

]