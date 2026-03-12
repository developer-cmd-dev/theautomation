import type { Node } from "@xyflow/react";

export type CustomNode = {
    id:string,
    title:string,
    handle_left:string|null,
    handle_right:string|null,
    handleCreate:(nodeType:string)=>void;
    icon:React.ReactNode,
    isConnected:false
} 


export type CustomNodeType = Node<CustomNode,'custom'>;

export type NodeType = 'trigger'|'gemini-model'|'http-request'|'code'