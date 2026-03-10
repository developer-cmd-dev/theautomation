import { Handle, Position } from '@xyflow/react'
import React from 'react'

function GoogleDocsNode() {
    return (
        <div title='googleGemini' className="bg-white border border-gray-600 p-2 rounded-md w-10 h-10 flex items-center justify-center aspect-video ">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path><path fill="#bbdefb" d="M40 13L30 13 30 3z"></path><path fill="#1565c0" d="M30 13L40 23 40 13z"></path><path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
            </svg>
            <Handle id={'googleDocs-node-right'} className='' type="source" position={Position.Right} />
            <Handle id={'googleDocs-node-left'} className='' type="target" position={Position.Left} />
        </div>
    )
}

export default GoogleDocsNode