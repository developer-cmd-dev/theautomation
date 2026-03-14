import React from 'react'
import ExecutionResult from './ExecutionResult'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { GeminiCredentialDialog } from './GeminiCredentialDialog'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'

function GeminiNodeConfig() {
    return (
        <div className="w-full h-full     flex items-center ">

            <ExecutionResult type="Input" />


            <div className='w-5xl h-full border rounded-md p-4 flex flex-col gap-5' >
                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Gemini Model</Label>
                    <Select >
                        <SelectTrigger className="w-full max-w-full">
                            <SelectValue placeholder="Credentials" />
                        </SelectTrigger>
                        <SelectContent  >
                            {
                                existingCredentials.map((element) => {
                                    return (
                                        <SelectGroup key={element}>
                                            <SelectItem value={element}>{element}</SelectItem>
                                        </SelectGroup>
                                    )
                                })
                            }
                            <GeminiCredentialDialog>
                                <Button variant={'ghost'} className='w-full'>
                                    Create Credential
                                </Button>
                            </GeminiCredentialDialog>
                        </SelectContent>
                    </Select>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Resources</Label>
                    <Select >
                        <SelectTrigger className="w-full max-w-full">
                            <SelectValue placeholder="resources" />
                        </SelectTrigger>
                        <SelectContent  >
                            <SelectGroup>
                                <SelectItem value="Text">Text</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Operation</Label>
                    <Select >
                        <SelectTrigger className="w-full max-w-full">
                            <SelectValue placeholder="operation" />
                        </SelectTrigger>
                        <SelectContent  >
                            <SelectGroup>
                                <SelectItem value="Message a Model">Message a Model</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Messages</Label>
                    <Separator />
                    <Textarea placeholder='Enter Prompt'/>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Simplify Output</Label>
                    <Switch defaultChecked={true}/>
                </div>

                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">JSON Output</Label>
                    <Switch/>
                </div>




            </div>

            <ExecutionResult type="Output" />
        </div>
    )
}

export default GeminiNodeConfig


const existingCredentials: string[] = []