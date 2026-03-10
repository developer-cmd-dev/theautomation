import { Handle, Position } from '@xyflow/react'
import { Braces } from 'lucide-react'
import React from 'react'

function ScriptNode() {
    return (
        <div title='scheduler' className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
            <Braces />
            <Handle id={'script-node-right'} className='' type="source" position={Position.Right} />
            <Handle id={'script-node-left'} className='' type="target" position={Position.Left} />
        </div>
    )
}

export default ScriptNode