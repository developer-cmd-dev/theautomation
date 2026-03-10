import type { CustomNodeType } from '@/types/types';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import React from 'react'
import { SheetTriggerComponent } from './SheetTrigger';
import { Plus } from 'lucide-react';



function CustomNode({ data }: NodeProps<CustomNodeType>) {
  return (
    <div title={data.title} className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
      {data.icon}
      {data.handle_right && <Handle id={data.handle_right} className='' type="source" position={Position.Right} />}
      {data.handle_left && <Handle id={data.handle_left} className='' type="target" position={Position.Left} />}
      <SheetTriggerComponent handleClick={data.handleCreate} type='node'>
      <button  className='absolute left-13 bg-white border border-gray-600 rounded-xs flex items-center justify-center'><Plus className='size-2.5'/></button>
      </SheetTriggerComponent>
    </div>
  )
}

export default CustomNode