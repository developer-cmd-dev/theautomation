import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MarkerType, Controls, MiniMap, Position, type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect, type NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import CreateFlow from './CreateFlow';
import SchedulerNode from './SchedulerNode';
import GeminiNode from './GeminiNode';
import HttpNode from './HttpNode';
import ScriptNode from './ScriptNode';
import GoogleDocsNode from './GoogleDocsNode';
import { CustomEdge } from './CustomEdge';
import CustomNode from './CustomNode';
import { Clock } from 'lucide-react';
import type { NodeType } from '@/types/types';


const NodeTypes = {
    // schdulerNode: SchedulerNode,
    // httpNode: HttpNode,
    // geminiNode: GeminiNode,
    // scriptNode: ScriptNode,
    // googleDocsNode: GoogleDocsNode
    customNode:CustomNode

}

const EdgeType = {
    customEdge: CustomEdge
}



// const initialNodes:Node[] = [
//     { id: 'n1', position: { x: -200, y: 0 }, data: { label: 'Node 1' }, type: 'schdulerNode' },
//     { id: 'n2', position: { x: -100, y: 0 }, data: { label: 'Node 2' }, type: 'httpNode' },
//     { id: 'n3', position: { x: 0, y: 0 }, data: { label: 'Node 3' }, type: 'geminiNode' },
//     { id: 'n4', position: { x: 100, y: 0 }, data: { label: 'Node 4' }, type: 'scriptNode' },
//     { id: 'n5', position: { x: 200, y: 0 }, data: { label: 'Node 5' }, type: 'scriptNode' },
//     { id: 'n6', position: { x: 300, y: 0 }, data: { label: 'Node 6' }, type: "googleDocsNode" }
// ];

const initialNodes: Node[] = [];
const initialEdges: Edge[] = []



// const initialEdges:Edge[] = [
//     {
//         id: 'n1-n2',
//         source: 'n1',
//         target: 'n2',
//         sourceHandle: 'scheduler-node',
//         targetHandle: 'http-node-left',
//         type:"customEdge",
//         markerEnd: {
//             type: MarkerType.ArrowClosed
//         },

//     },
//     {
//         id: 'n2-n3',
//         source: 'n2',
//         target: 'n3',
//         type:"customEdge",

//         sourceHandle: 'http-node-right',
//         targetHandle: 'gemini-node-left',
//         markerEnd: {
//             type: MarkerType.ArrowClosed
//         },

//     },
//     {
//         id: 'n3-n4',
//         source: 'n3',
//         target: 'n4',
//         type:"customEdge",

//         sourceHandle: 'gemini-node-right',
//         targetHandle: 'script-node-left',
//         markerEnd: {
//             type: MarkerType.ArrowClosed
//         },

//     },
//     {
//         id: 'n4-n5',
//         source: 'n4',
//         target: 'n5',
//         type:"customEdge",

//         sourceHandle: 'script-node-right',
//         targetHandle: 'script-node-left',
//         markerEnd: {
//             type: MarkerType.ArrowClosed
//         },

//     },
//     {
//         id: 'n5-n6',
//         source: 'n5',
//         target: 'n6',
//         type:"customEdge",

//         sourceHandle: 'script-node-right',
//         targetHandle: 'googleDocs-node-left',
//         markerEnd: {
//             type: MarkerType.ArrowClosed
//         },

//     }
// ];

export default function Flow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => {
            console.log(params)
            setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot))
        },
        [],
    );


    const handleCreate = (nodeType: string) => {
        if (nodeType === 'trigger') {
            const scheduleNode = {
                 id: 'n1', 
                 position: { x: -200, y: 0 }, 
                 data: { 
                    label: 'Node 1',
                    title:'scheduler',
                    icon:<Clock/>,
                    handleCreate ,
                    id:'scheduler-node',
                    handle_right:'scheduler-node',
                    handle_left:null
                }, 
                 type: 'customNode' 
                };
            initialNodes.push(scheduleNode)
            setNodes((nodeSnapShot) => [...nodeSnapShot, scheduleNode])
        }else if(nodeType ==='gemini'){


        }
    }







    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#a1a1a1_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#545454_1px,transparent_1px)]",
                )}
            />

            {
                nodes.length === 0 ? <CreateFlow handleCreate={handleCreate} /> :
                    <div className='h-full w-full'>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            fitView
                            nodeTypes={NodeTypes}
                            edgeTypes={EdgeType}
                        />
                    </div>


            }



        </div>
    );
}