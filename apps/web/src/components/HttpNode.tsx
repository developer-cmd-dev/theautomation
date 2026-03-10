import { Handle, Position } from '@xyflow/react'
import React from 'react'

function HttpNode() {
  return (
    <div title='scheduler' className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
        <h1 className='text-xs'>HTTP</h1>
    <Handle id={'http-node-right'} className='' type="source" position={Position.Right} />
    <Handle id={'http-node-left'} className='' type="target" position={Position.Left} />


</div>
  )
}

export default HttpNode