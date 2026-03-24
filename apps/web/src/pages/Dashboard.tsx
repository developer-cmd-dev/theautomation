import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/axios'
import { useWorkflowData } from '@/store/workflow.store'
import { CreateWorkflowZodSchema } from '@repo/types/types'
import { Axios, AxiosError } from 'axios'
import { MoveLeft, MoveRight, MoveRightIcon } from 'lucide-react'
import React, { useEffect, useState, type ChangeEvent } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
function Dashboard() {

    const backendUrl = "";

    const [workflowName, setWorkflowName] = useState<string | null>(null);
    const { setWorkFlowData, setExistingWorkFlows, existingWorkFlows } = useWorkflowData((state) => state)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [fetchWorkflowsLoading, setFetchWorkFlowsLoading] = useState(false)






    const handleWorkflowCreate = async () => {

        const data = CreateWorkflowZodSchema.safeParse({
            name: workflowName,
            connections: [],
            nodes: {}
        })

        if (!data.success) {
            toast.error("Invalid Input")
            return
        }
        setLoading(true)
        const response = await api({
            url: `http://localhost:8080/api/v1/create-workflow`,
            method: 'POST',
            data: {
                name: workflowName,
                connections: [],
                nodes: {}
            }
        })

        if (response instanceof AxiosError) {
            console.log(response.message)
            setLoading(false)
        } else {
            setLoading(false)
            toast.success("Workflow created")
            setExistingWorkFlows(response.data);
            setWorkFlowData(response.data);
            navigate('/workflow');
        }

    }




    useEffect(() => {

        (async () => {

            setFetchWorkFlowsLoading(true)
            const response = await api({
                url: 'http://localhost:8080/api/v1/get-workflow',
                method: 'GET'
            })

            if (response instanceof AxiosError) {
                console.log(response.response?.data.message)
                return
            }
            setExistingWorkFlows(response.data);
            setFetchWorkFlowsLoading(false)


        })()




    }, [])





    return (
        <div className='h-screen w-full flex flex-col border items-center justify-center'>
            <div className='w-1/2 h-fit   p-2 gap-20 flex flex-col justify-center items-center  '>
            <h1 className=' text-8xl text-center font-bold'>Create Workflow</h1>
                <div className='w-full flex gap-5 items-center '>
                    <Input required className='w-full h-20' placeholder='Enter Workflow name' onChange={(e) => setWorkflowName(e.target.value)} />
                    <Button onClick={handleWorkflowCreate} className='h-[70%] rounded-2xl'>
                        {
                            loading ?
                                <Spinner /> :
                                <MoveRightIcon className='size-8' />
                        }
                    </Button>
                </div>
            </div>

            <div className='w-1/2  h-fit flex flex-col gap-4 items-center justify-center max-h-screen overflow-y-auto overflow-x-hidden  py-6 px-1'>
                {fetchWorkflowsLoading ?
                    <Spinner className='size-8' /> :

                    existingWorkFlows.map((workflows) => (
                        <Item key={workflows._id} variant="outline" className='w-full'>
                            <ItemContent>
                                <ItemTitle>{workflows.name}</ItemTitle>
                                <ItemDescription>
                                    A simple workflow which will give you jobs everyday.
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button
                                onClick={()=>{
                                    setWorkFlowData(workflows);
                                    navigate('/workflow')
                                }}
                                
                                variant="outline" size="sm" className='cursor-pointer'>
                                    Open
                                </Button>
                            </ItemActions>
                        </Item>
                    ))


                }
            </div>



        </div>
    )
}

export default Dashboard