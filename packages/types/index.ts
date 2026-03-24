import * as z from "zod";






export const CreateWorkflowZodSchema = z.object({
    name: z.string(),
    connections: z.object().array(),
    nodes: z.object().array()

})


export interface ApiProps {
    url: string;
    method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT'
    | 'TRACE';

    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
    responseType?: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream';
    withCredentials?: boolean;
    auth?: {
        username: string;
        password: string;
    };
    baseURL?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    cancelToken?: any;
}



export type NodeType = 'trigger' | 'gemini-model' | 'http-request' | 'code' | 'google-docs'


export type TriggerInMinute = {
    time: number
}


export type HttpMethods =
    'GET' |
    'POST' |
    'PUT' |
    'PATCH' |
    'DELETE' |
    'HEAD' |
    'OPTIONS' |
    'CONNECT' |
    'TRACE';

export type HttpNodeRuleType = ApiProps

export interface WorkFlowUpdate {
    nodeType: NodeType,
    rule: object
}





export type CreateWorkflowSchema = z.infer<typeof CreateWorkflowZodSchema>