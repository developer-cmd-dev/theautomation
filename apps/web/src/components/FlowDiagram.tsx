import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import CreateFlow from './CreateFlow';
import { CustomEdge } from './CustomEdge';
import CustomNode from './CustomNode';
import { Braces, Clock, Globe, } from 'lucide-react';
import { createConnection, createNode } from '@/NodeLogic/logic';
import { NodeMenuDrawer } from './NodeMenuDrawer';
import useNodeMenuDrawerData from '@/store/nodeMenuDrawer.store';
import { useWorkflowData } from '@/store/workflow.store';


const NodeTypes = {

    customNode: CustomNode

}

const EdgeType = {
    customEdge: CustomEdge
}



const initialNodes: Node[] = [];
const initialEdges: Edge[] = []


export default function Flow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const {setNodeDrawerHandleData}=useNodeMenuDrawerData((state)=>state)
    const {data}=useWorkflowData((state)=>state)
  

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [nodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => {
            const newEdge = { ...params, type: 'customEdge' }
            setEdges((edgesSnapshot) => addEdge(newEdge, edgesSnapshot))
        },
        [],
    );


    const handleCreate = (nodeType: string) => {
        if (nodeType === 'trigger') {

            const schedulerNode = createNode(nodeType, initialNodes, <Clock />, handleCreate)

            initialNodes.push(schedulerNode);
            setNodes((nodeSnapShot) => {
                return [...nodeSnapShot]
            })

            if(schedulerNode){
            setNodeDrawerHandleData({isCreated:true,nodeType:'scheduler'})

            }
        } else if (nodeType === 'gemini-model') {
            const icon = <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#paint0_linear)" />
                <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4285F4" />
                        <stop offset="1" stopColor="#9B72CB" />
                    </linearGradient>
                </defs>
            </svg>;


            const geminiNode = createNode(nodeType, initialNodes, icon, handleCreate)
            const getLastNode = initialNodes[initialNodes.length - 1];


            initialNodes.push(geminiNode)
            setNodes((nodeSnapShot) => [...nodeSnapShot, geminiNode])
            if (getLastNode) {
                const { connection, lastNodeConnected } = createConnection(getLastNode, geminiNode, initialNodes);
                setNodes(lastNodeConnected)
                setEdges((edgeSnapshot) => {
                    return [...edgeSnapshot, connection]
                })

            }

            if(geminiNode){
                setNodeDrawerHandleData({isCreated:true,nodeType})
            }
        } else if (nodeType === 'http-request') {

            const httpNode = createNode(nodeType, initialNodes, <Globe />, handleCreate)
            const getLastNode = initialNodes[initialNodes.length - 1];


            initialNodes.push(httpNode)
            setNodes((nodeSnapShot) => [...nodeSnapShot, httpNode])
            if (getLastNode) {
                const { connection, lastNodeConnected } = createConnection(getLastNode, httpNode, initialNodes);
                setNodes(() => lastNodeConnected)
                setEdges((edgeSnapshot) => {
                    return [...edgeSnapshot, connection]
                })
            }

            if(httpNode){
                setNodeDrawerHandleData({isCreated:true,nodeType})
            }

        } else if (nodeType === 'code') {
            const codeNode = createNode(nodeType, initialNodes, <Braces />, handleCreate)
            const getLastNode = initialNodes[initialNodes.length - 1];


            initialNodes.push(codeNode)
            setNodes((nodeSnapShot) => [...nodeSnapShot, codeNode])
            if (getLastNode) {
                const { connection, lastNodeConnected } = createConnection(getLastNode, codeNode, initialNodes)



                setNodes(() => lastNodeConnected)

                setEdges((edgeSnapshot) => {

                    return [...edgeSnapshot, connection]
                })

            }

            if(codeNode){
                setNodeDrawerHandleData({isCreated:true,nodeType})
            }
        } else if (nodeType === 'google-docs') {
            const icon = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path><path fill="#bbdefb" d="M40 13L30 13 30 3z"></path><path fill="#1565c0" d="M30 13L40 23 40 13z"></path><path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
            </svg>;

            const googleDocsNode = createNode(nodeType, initialNodes, icon, handleCreate)
            const getLastNode = initialNodes[initialNodes.length - 1];



            initialNodes.push(googleDocsNode)
            setNodes((nodeSnapShot) => [...nodeSnapShot, googleDocsNode])
            if (getLastNode) {
                const { connection, lastNodeConnected } = createConnection(getLastNode, googleDocsNode, initialNodes)



                setNodes(() => lastNodeConnected)

                setEdges((edgeSnapshot) => {

                    return [...edgeSnapshot, connection]
                })

            }

            if(googleDocsNode){
                setNodeDrawerHandleData({isCreated:true,nodeType})
            }
        }
    }








    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-size-[20px_20px]",
                    "bg-[radial-gradient(#a1a1a1_1px,transparent_1px)]",
                    "dark:bg-[radial-gradient(#545454_1px,transparent_1px)]",
                )}
            />

            {
                nodes.length === 0 ? <CreateFlow handleCreate={handleCreate} /> :
                    <div className='h-full w-full'>
                        <ReactFlow
                            className='border border-red'
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


            <NodeMenuDrawer  />


        </div>
    );
}