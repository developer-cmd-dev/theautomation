import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { MoveLeft, MoveRight, MoveRightIcon } from 'lucide-react'
import React, { useState, type ChangeEvent } from 'react'

function Dashboard() {

    const backendUrl = ""; 

    const [workflowName,setWorkflowName]=useState("")

    const handleWorkflowCreate = async()=>{

      const response = await  api({
            url:`http://localhost:8080/api/v1/create-workflow`,
            method:'POST'
        })

        console.log(response)
    }





    return (
        <div className='h-screen w-full flex flex-col border items-center justify-center'>
            <div className='w-1/2 h-fit   p-2 gap-20 flex flex-col justify-center items-center  '>
                <h1 className=' text-8xl text-center font-bold'>Create Workflow</h1>
                <div className='w-full flex gap-5 items-center '>
                    <Input className='w-full h-20' placeholder='Enter Workflow name' onChange={(e)=>setWorkflowName(e.target.value)} />
                    <Button onClick={handleWorkflowCreate} className='h-[70%] rounded-2xl'><MoveRightIcon className='size-8' /></Button>
                </div>
            </div>

            <div className='w-1/2 h-fit max-h-screen overflow-y-auto overflow-x-hidden  py-6 px-1'>
                <Item variant="outline">
                    <ItemContent>
                        <ItemTitle>Job Automation workflow</ItemTitle>
                        <ItemDescription>
                            A simple workflow which will give you jobs everyday.
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button  variant="outline" size="sm" className='cursor-pointer'>
                            Open
                        </Button>
                    </ItemActions>
                </Item>
            </div>



        </div>
    )
}

export default Dashboard