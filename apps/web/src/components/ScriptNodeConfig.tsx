import React from 'react'
import ExecutionResult from './ExecutionResult'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import { Separator } from './ui/separator'
import Editor from '@monaco-editor/react'



function ScriptNodeConfig() {
    return (
        <div className="w-full h-full     flex items-center ">

            <ExecutionResult type="Input" />


            <div className='w-5xl h-full border rounded-md p-4 flex flex-col gap-5' >
                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Language</Label>
                    <Select >
                        <SelectTrigger className="w-full max-w-full">
                            <SelectValue placeholder="language" />
                        </SelectTrigger>
                        <SelectContent  >
                            <SelectGroup >
                                <SelectItem value="javascript">JavaScript</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>



                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Code</Label>
                    <Separator />
                    {/* <Textarea placeholder='Enter Prompt' /> */}
                    
                    <Editor 
                    height={'50vh'}
                    className='rounded-md' 
                    defaultLanguage='javascript'
                    theme='vs-light'
                    />
                </div>




            </div>

            <ExecutionResult type="Output" />
        </div>
    )
}

export default ScriptNodeConfig


const existingCredentials: string[] = []