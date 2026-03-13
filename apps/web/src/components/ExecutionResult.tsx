import { cn } from '@/lib/utils'
import React from 'react'
import { Separator } from './ui/separator'
import { Zap } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
    className?: string;
    type: 'Input' | 'Output'
}


function ExecutionResult({ className, type }: Props) {
    return (
        <div id="execution_result" className={cn("w-full h-full p-4", className)}>
            <div className=" flex  flex-col gap-3">
                <h1 className="text-gray-500">{type}</h1>
                <Separator />
            </div>

            <div className="w-full h-full flex items-center justify-center ">
               {
                type==='Output'? <div className=' flex items-center justify-center flex-col gap-3'>
                <Zap className="size-8" />
                <Button variant={'outline'}>Execute Step</Button>
                </div>:<div>Result</div>
               }
            </div>
        </div>
    )
}

export default ExecutionResult