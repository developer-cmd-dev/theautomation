import type { Node } from "@xyflow/react";

export type CustomNode = {
    id: string,
    title: string,
    type: string;
    handle_left: string | null,
    handle_right: string | null,
    handleCreate: (nodeType: string) => void;
    icon: React.ReactNode,
    isConnected: false
}


export type CustomNodeType = Node<CustomNode, 'custom'>;


export type IntervalTypes = "minutes" | "hours" | "days" | "weeks" | "months"


export interface HttpFields{

    type:string;
    key:string,
    value:string


}



