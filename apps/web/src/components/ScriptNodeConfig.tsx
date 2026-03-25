import React, { useCallback, useState } from 'react'
import ExecutionResult from './ExecutionResult'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import { Separator } from './ui/separator'
import Editor, { type EditorProps } from '@monaco-editor/react'



function ScriptNodeConfig() {

    const [code,setCode]=useState('')

    const handleEditorMount = useCallback((editor:any,monaco:any)=>{
        editor.onKeyDown((e:KeyboardEvent) => {
            if (e.keyCode === monaco.KeyCode.Space) {
              e.preventDefault(); // Prevent default behavior
              editor.trigger('keyboard', 'type', { text: ' ' }); // Insert a space
            }
          });
    },[])   



    return (
        <div className="w-full h-full flex items-center ">

            <ExecutionResult type="Input" />


            <div className='min-w-150 max-w-150 h-full border rounded-md p-4 flex flex-col gap-5' >
                <div className="input-area  flex flex-col gap-3 ">
                    <Label className="text-gray-500 font-semibold">Language</Label>
                    <Select defaultValue='javascript' >
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
                    onMount={handleEditorMount}
                    height={'50vh'}
                    className='rounded-md' 
                    language='javascript'
                    theme='vs-light'
                    onChange={(e)=>setCode(e?.toString()??"")}
                    value={code}
                    />
                </div>




            </div>

            <ExecutionResult type="Output" />
        </div>
    )
}

export default ScriptNodeConfig


const existingCredentials: string[] = []