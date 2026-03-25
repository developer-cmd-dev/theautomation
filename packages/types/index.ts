import * as z from "zod";

export const CreateWorkflowZodSchema = z.object({
    name: z.string(),
    connections: z.object().array(),
    nodes: z.object()

})

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    TRACE = "TRACE"

}

export const HttpRequestPayloadZodSchema = z.object({
    url: z.string(),
    method: z.enum(HttpMethods),
    data: z.any().optional(),
    params: z.record(z.string(),z.string()).optional(),
    headers: z.record(z.string(),z.string()).optional(),
    timeout: z.number().optional(),
    responseType: z.enum([
        'json',
        'arraybuffer',
        'blob',
        'document',
        'text',
        'stream'
    ]).optional(),
 

});


export type HttpRequestPayload = z.infer<typeof HttpRequestPayloadZodSchema>


export interface ApiProps {
    url: string;
    method:HttpMethods
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


// export type HttpMethods =
//     'GET' |
//     'POST' |
//     'PUT' |
//     'PATCH' |
//     'DELETE' |
//     'HEAD' |
//     'OPTIONS' |
//     'CONNECT' |
//     'TRACE';

export type HttpNodeRuleType = ApiProps

export interface WorkFlowUpdate {
    nodeType: NodeType,
    connections:object[];
    rule: object;
}





export type CreateWorkflowSchema = z.infer<typeof CreateWorkflowZodSchema>