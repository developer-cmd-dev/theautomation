import React from 'react'
import { Button } from './ui/button'
import { BadgePlus } from 'lucide-react'
import { SheetTriggerComponent } from './SheetTrigger'

function CreateFlow({handleCreate}:{handleCreate:(nodeType:string)=>void}) {

 



    return (
        <div className='w-30 h-20 z-10  flex flex-col items-center justify-center text-gray-500'   >
           <SheetTriggerComponent handleClick={handleCreate} type='trigger'>
           <Button  className='w-full h-full flex items-center justify-center cursor-pointer' variant={"outline"} size={"icon-lg"}  >
                <BadgePlus className='size-8 ' />
            </Button>

           </SheetTriggerComponent>
            <p>Create Flow</p>

        </div>


    )
}

export default CreateFlow