import type { NodeType } from "@/types/types";
import { MarkerType, type Edge, type Node } from "@xyflow/react";


export function createNode (nodeType:NodeType,initialNodes:Node[],icon:React.ReactNode,handleCreate:(nodeType:string)=>void):Node{

    let lastNodeXPosition = initialNodes[initialNodes.length-1]?.position.x;

    lastNodeXPosition ? lastNodeXPosition+=100:lastNodeXPosition=0;
    

    if (nodeType === 'trigger') {
        const scheduleNode = {
            id: `n${initialNodes.length+1}`,
            position: { x: -400, y: 0 },
            data: {
                label: 'Node 1',
                title: 'scheduler',
                icon:icon,
                id: 'scheduler-node',
                handle_right: 'scheduler-node',
                handle_left: null,
                handleCreate,
                isConnected:false
            },
            type: 'customNode',
            
        }

        return scheduleNode
        
    }else if(nodeType==='gemini-model'){
     
        const geminiNode = {
            id: `n${initialNodes.length+1}`,
            position: { x:lastNodeXPosition||0, y: 0 },
            data: {
                label: `Node ${initialNodes.length+1}`,
                title: 'gemini-node',
                id: 'gemini-node',
                icon:icon,
                handle_right: 'gemini-node-right',
                handle_left: 'gemini-node-left',
                handleCreate,
                isConnected:false
            },
            type:'customNode'


        }

        return geminiNode
    }else if(nodeType==='http-request'){
           
        const httpNode = {
            id: `n${initialNodes.length+1}`,
            position: { x:lastNodeXPosition||0, y: 0 },
            data: {
                label: `Node ${initialNodes.length+1}`,
                title: 'http-node',
                id: 'http-node',
                icon:icon,
                handle_right: 'http-node-right',
                handle_left: 'http-node-left',
                handleCreate,
                isConnected:false
            },
            type:'customNode'


        }

        return httpNode
    }else if(nodeType==='google-docs'){
        const googleDocsNode = {
            id: `n${initialNodes.length+1}`,
            position: { x:lastNodeXPosition||0, y: 0 },
            data: {
                label: `Node ${initialNodes.length+1}`,
                title: 'google-docs-node',
                id: 'google-docs-node',
                icon:icon,
                handle_right: 'google-docs-node-right',
                handle_left: 'google-docs-node-left',
                handleCreate,
                isConnected:false
            },
            type:'customNode'


        }

        return googleDocsNode
    }else{
        const codeNode = {
            id: `n${initialNodes.length+1}`,
            position: { x:lastNodeXPosition||0, y: 0 },
            data: {
                label: `Node ${initialNodes.length+1}`,
                title: 'code-node',
                id: 'code-node',
                icon:icon,
                handle_right: 'code-node-right',
                handle_left: 'code-node-left',
                handleCreate,
                isConnected:false
            },
            type:'customNode'


        }

        return codeNode
    }


}



export function createConnection(lastNode:Node,currentNode:Node,initialNodes:Node[]):{connection:Edge,lastNodeConnected:Node[]}{

    const connection: Edge = {
        id: `${lastNode.id}-${currentNode.id}`,
        source: lastNode?.id,
        target: currentNode.id,
        sourceHandle: lastNode.data.handle_right as string,
        targetHandle: currentNode.data.handle_left as string,
        markerEnd: {
            type: MarkerType.ArrowClosed
        },
        type: 'customEdge'

    }
    const lastNodeConnected:Node[]= initialNodes.map((elem)=>{
        if(elem.id === lastNode.id){
           elem.data.isConnected=true;
        }
        elem.position.x -=100;
        return elem
      })



    return {connection,lastNodeConnected};
}