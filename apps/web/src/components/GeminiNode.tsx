import { Handle, Position } from '@xyflow/react'
import { Clock } from 'lucide-react'

function GeminiNode() {
    return (
        <div title='scheduler' className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#paint0_linear)" />
                <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4285F4" />
                        <stop offset="1" stopColor="#9B72CB" />
                    </linearGradient>
                </defs>
            </svg>
            <Handle id={'gemini-node-right'} className='' type="source" position={Position.Right} />
            <Handle id={'gemini-node-left'} className='' type="target" position={Position.Left} />


        </div>

    )
}

export default GeminiNode