import { Handle, Position } from '@xyflow/react'
import { Clock } from 'lucide-react'

function GeminiNode() {
    return (
        <div title='scheduler' className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
            
            <Handle id={'gemini-node-right'} className='' type="source" position={Position.Right} />
            <Handle id={'gemini-node-left'} className='' type="target" position={Position.Left} />


        </div>

    )
}

export default GeminiNode