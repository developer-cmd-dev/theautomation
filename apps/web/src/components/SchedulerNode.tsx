import React from 'react'
import { Handle, Position, type NodeProps,type Node } from '@xyflow/react'
import { Clock, Plus } from 'lucide-react'
import { SheetTrigger } from './ui/sheet'
import { SheetTriggerComponent } from './SheetTrigger'

type CustomNode = {
  handleCreate:(nodeType:string)=>void
}

type customNodeType = Node<CustomNode,'custom'>

function SchedulerNode({data}:NodeProps<customNodeType>) {
  return (
    <div title='scheduler' className="relative bg-white border border-gray-600 rounded-tl-full rounded-bl-full w-10 h-10 flex items-center justify-center ">
      <Clock className='size-3' />
      <Handle id={'scheduler-node'} type="source" position={Position.Right} />
      <SheetTriggerComponent handleClick={data.handleCreate} type='node'>
      <button  className='absolute left-13 bg-white border border-gray-600 rounded-xs flex items-center justify-center'><Plus className='size-2.5'/></button>
      </SheetTriggerComponent>
    </div>

  )
}

export default SchedulerNode