import React, { useEffect, useState } from 'react'
import ExecutionResult from './ExecutionResult'
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { NodeOptionDialog } from './NodeOptionDialog';
import type { HttpMethods } from '@repo/types/types';

function HttpNodeConfig() {

    const [method,setMethod]=useState<string>('GET');
    const [url,setUrl]=useState<string>('')


    const handleOptions = ()=>{
        
    }


    return (
        <div className="w-full h-full flex items-center ">

            <ExecutionResult type="Input" />

            <div className='w-5xl h-full border rounded-md p-4 flex flex-col gap-5' >
                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">HTTP Methods</Label>
                    <Select onValueChange={(e:HttpMethods)=>setMethod(e)} defaultValue={method}  >
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
                    <Input value={url} onChange={(e)=>setUrl(e.target.value)} type='text' placeholder='http://example.com' />
                </div>


                {
                    options.map((element) => {
                        return (
                            <div key={element.type} className="input-area  flex flex-col gap-3  ">
                                <Label className="text-gray-500 font-semibold">{element.title}</Label>
                                <NodeOptionDialog type={element.type}>
                                    <Button variant={"outline"}>
                                        Add
                                    </Button>
                                </NodeOptionDialog>
                            </div>
                        )
                    })
                }

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
    {
        type: 'body',
        title: "Send Body"
    }
]